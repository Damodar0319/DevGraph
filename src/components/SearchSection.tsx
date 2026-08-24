import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Mic, MicOff, ArrowRight, X, AlertCircle } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  isRepoAnalyzed?: boolean;
}

export const K8S_EXAMPLE_QUESTIONS = [
  "Explain the README of this repository",
  "What does Kubernetes do?",
  "Where is the Kubernetes scheduler implemented?",
  "What are the main components of Kubernetes?",
  "What are the main directories in the Kubernetes codebase?",
  "Who has contributed to the scheduler?",
  "What files were changed by recent scheduler pull requests?",
  "What issues are related to the scheduler?",
  "What technologies or dependencies does this repository use?"
];

export function SearchSection({ onSearch, isLoading, isRepoAnalyzed = true }: SearchSectionProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceBannerMessage, setVoiceBannerMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleExecuteSearch = (searchText?: string) => {
    const textToSearch = (searchText !== undefined ? searchText : query).trim();
    if (!textToSearch) {
      setErrorMessage('Please enter an engineering question.');
      inputRef.current?.focus();
      return;
    }
    setErrorMessage(null);
    setVoiceBannerMessage(null);
    onSearch(textToSearch);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch();
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    setErrorMessage(null);
    setVoiceBannerMessage(null);
    handleExecuteSearch(example);
  };

  const handleMicClick = () => {
    setErrorMessage(null);

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      setVoiceBannerMessage(null);
      return;
    }

    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage("Voice search isn't supported in this browser. Please use Chrome or Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceBannerMessage('Listening... Speak your engineering question now.');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setQuery(transcript);
        setVoiceBannerMessage(`Heard: "${transcript}"`);

        if (event.results[current].isFinal) {
          setIsListening(false);
          setVoiceBannerMessage(null);
          setTimeout(() => {
            handleExecuteSearch(transcript);
          }, 350);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone permission was denied. Please allow microphone access or type your question.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please try again or type your question.');
        } else {
          setErrorMessage(`Microphone error: ${event.error}. Please type your question.`);
        }
        setVoiceBannerMessage(null);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceBannerMessage(null);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('Speech recognition initialization error:', err);
      setIsListening(false);
      setErrorMessage('Could not initialize microphone. Please type your question.');
      setVoiceBannerMessage(null);
    }
  };

  const handleClear = () => {
    setQuery('');
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-5">
      {/* Listening Banner */}
      {isListening && (
        <div className="bg-rose-600 text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-lg flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>{voiceBannerMessage || 'Listening... Speak your question now'}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:150ms] h-3"></span>
              <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:300ms] h-1.5"></span>
            </div>

            <button
              onClick={() => handleMicClick()}
              className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 animate-fade-in shadow-2xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div 
          className={`relative flex items-center bg-white rounded-2xl md:rounded-3xl border transition-all duration-200 shadow-xl
            p-2 sm:p-2.5 pl-4 sm:pl-6 border-slate-200/90 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15
            ${isListening ? 'ring-4 ring-rose-500/20 border-rose-500' : ''}
          `}
        >
          <div className="flex items-center text-brand-600 mr-2.5 shrink-0">
            <Sparkles className="w-5 h-5 text-brand-600" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Ask anything about Kubernetes code, README, components, PRs, or architecture..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-hidden font-medium text-sm sm:text-base md:text-lg"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-300 hover:text-slate-600 rounded-md transition-colors mr-1.5 shrink-0 cursor-pointer"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-1">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isLoading}
              className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-150 relative cursor-pointer
                ${isListening 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105' 
                  : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100 active:scale-95'
                }
              `}
              title={isListening ? 'Stop listening' : 'Click to speak your question'}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 animate-pulse" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-98 rounded-xl sm:rounded-2xl transition-all shadow-md px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Example Questions */}
      <div className="space-y-2.5 pt-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block text-center sm:text-left">
          Try asking an engineering question:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {K8S_EXAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleClick(q)}
              disabled={isLoading}
              className="text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-brand-700 hover:border-brand-300 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-all duration-150 flex items-center gap-1.5 group cursor-pointer disabled:opacity-50 text-left"
            >
              <span>{q}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
