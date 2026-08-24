import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FormattedAnswerViewProps {
  content: string;
}

export function FormattedAnswerView({ content }: FormattedAnswerViewProps) {
  if (!content) return null;

  // Split content by double newlines or single newlines for block parsing
  const rawLines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let currentListType: 'ul' | 'ol' = 'ul';

  const flushList = () => {
    if (currentListItems.length > 0) {
      if (currentListType === 'ul') {
        blocks.push(
          <ul key={`list-${blocks.length}`} className="space-y-2 my-3 pl-1">
            {currentListItems}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`list-${blocks.length}`} className="space-y-2 my-3 pl-1 list-decimal list-inside">
            {currentListItems}
          </ol>
        );
      }
      currentListItems = [];
    }
  };

  // Helper to parse inline bold, code, and links
  const renderInlineFormatted = (text: string): React.ReactNode => {
    // Regex for:
    // [text](url) -> Link
    // `code` -> Code
    // **bold** -> Bold
    const tokens: React.ReactNode[] = [];
    let remaining = text;
    let tokenKey = 0;

    while (remaining.length > 0) {
      // 1. Check for link [title](url)
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        tokens.push(
          <a
            key={`tok-${tokenKey++}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 hover:text-brand-800 font-semibold underline underline-offset-2 inline-flex items-center gap-0.5"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline-block opacity-70" />
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // 2. Check for inline code `code`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        tokens.push(
          <code
            key={`tok-${tokenKey++}`}
            className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[12px] text-slate-800 font-medium"
          >
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // 3. Check for bold **text**
      const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        tokens.push(
          <strong key={`tok-${tokenKey++}`} className="font-bold text-slate-900">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // 4. Regular characters until next special marker
      const nextSpecial = remaining.search(/(\[|`|\*\*)/);
      if (nextSpecial === -1) {
        tokens.push(<span key={`tok-${tokenKey++}`}>{remaining}</span>);
        remaining = '';
      } else if (nextSpecial === 0) {
        // Just consume one character if it didn't match full pattern
        tokens.push(<span key={`tok-${tokenKey++}`}>{remaining[0]}</span>);
        remaining = remaining.slice(1);
      } else {
        tokens.push(<span key={`tok-${tokenKey++}`}>{remaining.slice(0, nextSpecial)}</span>);
        remaining = remaining.slice(nextSpecial);
      }
    }

    return <>{tokens}</>;
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Header 3 or 2 (### or ##)
    const h3Match = line.match(/^#{2,3}\s+(.*)$/);
    if (h3Match) {
      flushList();
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          className="text-sm sm:text-base font-bold text-slate-900 mt-5 mb-2 pb-1 border-b border-slate-100 flex items-center gap-1.5"
        >
          {renderInlineFormatted(h3Match[1])}
        </h3>
      );
      continue;
    }

    // Numbered list item: 1. Item or 1) Item
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numMatch) {
      currentListType = 'ol';
      currentListItems.push(
        <li key={`li-${currentListItems.length}`} className="text-slate-800 text-sm leading-relaxed">
          <span className="font-semibold text-slate-900 mr-1.5">{numMatch[1]}.</span>
          {renderInlineFormatted(numMatch[2])}
        </li>
      );
      continue;
    }

    // Bullet list item: * Item or - Item or • Item
    const bulletMatch = line.match(/^[\*\-•]\s+(.*)$/);
    if (bulletMatch) {
      currentListType = 'ul';
      currentListItems.push(
        <li key={`li-${currentListItems.length}`} className="flex items-start gap-2.5 text-slate-800 text-sm leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2"></span>
          <div>{renderInlineFormatted(bulletMatch[1])}</div>
        </li>
      );
      continue;
    }

    // Regular paragraph line
    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-slate-800 text-sm sm:text-base leading-relaxed my-2.5">
        {renderInlineFormatted(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 font-sans text-slate-800">{blocks}</div>;
}
