import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Mic, MicOff, ArrowRight, X, Volume2 } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  size?: 'normal' | 'large';
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const VOICE_SAMPLE_QUERIES = [
  "Why was Redis introduced in the authentication service?",
  "Who owns the payment service?",
  "Where is the JWT validation implemented?",
  "What services depend on the user-service?",
  "Why did we choose PostgreSQL instead of MongoDB?",
  "What caused the latest deployment failure?"
];

export function SearchBar({
  initialValue = '',
  placeholder = 'Ask DevGraph anything about your engineering organization...',
  size = 'normal',
  onSearch,
  className = '',
  autoFocus = false
}: SearchBarProps) {
  const { executeSearch, setCommandPaletteOpen } = useApp();
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatusText, setVoiceStatusText] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state if initialValue changes
  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  // Clean up speech recognition on unmount
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

  const triggerSearch = (searchQueryText: string) => {
    const finalQuery = searchQueryText.trim() || 'Why was Redis introduced in the authentication service?';
    setQuery(finalQuery);
    if (onSearch) {
      onSearch(finalQuery);
    } else {
      executeSearch(finalQuery);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    triggerSearch(query);
  };

  const handleMicClick = () => {
    if (isListening) {
      // Stop listening if already active
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      setVoiceStatusText(null);
      return;
    }

    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setVoiceStatusText('Listening... Speak your engineering question now.');
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setQuery(transcript);
          setVoiceStatusText(`Heard: "${transcript}"`);

          if (event.results[current].isFinal) {
            setIsListening(false);
            setVoiceStatusText(null);
            setTimeout(() => {
              triggerSearch(transcript);
            }, 300);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition notice:', event.error);
          setIsListening(false);
          // Fall back to simulation if blocked or no speech
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            runVoiceSimulation('Microphone access blocked. Running voice simulation...');
          } else {
            setVoiceStatusText(null);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          setVoiceStatusText(null);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition init error:', err);
      }
    }

    // Fallback if browser does not support Web Speech API
    runVoiceSimulation('Listening... (Voice Mode Active)');
  };

  const runVoiceSimulation = (statusMsg: string) => {
    setIsListening(true);
    setVoiceStatusText(statusMsg);
    
    // Pick a sample question
    const randomQuestion = VOICE_SAMPLE_QUERIES[Math.floor(Math.random() * VOICE_SAMPLE_QUERIES.length)];
    let charIndex = 0;
    setQuery('');

    const typingInterval = setInterval(() => {
      if (charIndex < randomQuestion.length) {
        setQuery(randomQuestion.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setIsListening(false);
          setVoiceStatusText(null);
          triggerSearch(randomQuestion);
        }, 500);
      }
    }, 35);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const isLarge = size === 'large';

  return (
    <div className={`relative w-full ${className}`}>
      {/* Listening Status Banner */}
      {isListening && (
        <div className="absolute -top-10 left-0 right-0 mx-auto max-w-md bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center justify-between animate-slide-up z-20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="truncate">{voiceStatusText || 'Listening... Speak your question'}</span>
          </div>

          {/* Sound wave visualizer bars */}
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
            <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:150ms] h-3.5"></span>
            <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:300ms] h-2"></span>
            <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:450ms] h-3"></span>
          </div>
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        className="relative w-full transition-all duration-200"
      >
        <div 
          className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 shadow-elevated
            ${isLarge 
              ? 'p-2 pl-4 sm:pl-5 border-slate-200/90 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10' 
              : 'p-1 pl-3 sm:pl-4 border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15'
            }
            ${isListening ? 'ring-4 ring-rose-500/20 border-rose-500' : ''}
          `}
        >
          {/* Sparkles / Search Icon */}
          <div className="flex items-center gap-2.5 text-brand-600 mr-2 shrink-0">
            <Sparkles className={isLarge ? 'w-5 h-5 text-brand-600' : 'w-4 h-4 text-brand-600'} />
          </div>

          {/* Main Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-hidden font-medium
              ${isLarge ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-sm'}
            `}
          />

          {/* Clear button if text entered */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-300 hover:text-slate-600 rounded-md transition-colors mr-1 shrink-0"
              title="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Action buttons inside bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-1">
            {/* Keyboard shortcut hint */}
            <kbd 
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md border border-slate-200/80 cursor-pointer transition-colors"
              title="Open Command Palette (⌘K)"
            >
              ⌘K
            </kbd>

            {/* Voice Search (Microphone) Button */}
            <button
              type="button"
              onClick={handleMicClick}
              className={`p-2 rounded-xl transition-all duration-150 relative cursor-pointer
                ${isListening 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105' 
                  : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100 active:scale-95'
                }
              `}
              title={isListening ? 'Stop listening' : 'Search with voice (Speech Recognition)'}
            >
              {isListening ? (
                <MicOff className={isLarge ? 'w-5 h-5 animate-pulse' : 'w-4 h-4 animate-pulse'} />
              ) : (
                <Mic className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
              )}
            </button>

            {/* Submit Action Button */}
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className={`flex items-center justify-center gap-1.5 font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-98 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap
                ${isLarge ? 'px-4 sm:px-5 py-2.5 text-xs sm:text-sm' : 'px-3 sm:px-3.5 py-1.5 text-xs'}
              `}
            >
              <span>Ask DevGraph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
