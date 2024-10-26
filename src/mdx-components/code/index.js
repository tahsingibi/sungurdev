'use client';
import React, { useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css'; // veya istediğiniz başka bir stil

export default function Code(props) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  // Extract the language from the className
  const className = props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || '';

  // Handle copy functionality
  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  // Syntax highlighting without useEffect
  const highlightedCode = hljs.highlightAuto(props.children, [language]).value;

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden max-w-full">
      <div className="flex justify-between bg-transparent py-2 px-4 border-b border-white/10">
        <div className="flex items-center gap-1 justify-center">
          <span className="rounded-full size-4 inline-flex bg-zinc-800" />
          <span className="rounded-full size-4 inline-flex bg-zinc-800" />
          <span className="rounded-full size-4 inline-flex bg-zinc-800" />
          <span className="text-gray-300 ml-2 font-sans">{language}</span>
        </div>
        <button
          type="button"
          className="text-gray-300 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 rounded-b-lg overflow-x-auto bg-zinc-950 m-0 !max-h-96 !overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-zinc-900 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full ">
        <code
          ref={codeRef}
          className={`language-${language} text-xs  font-light slashed-zero whitespace-pre-wrap leading-relaxed `}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
