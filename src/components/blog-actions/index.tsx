'use client';

import { Icon } from '@/src/components/icon';
import { useState } from 'react';

interface BlogActionsProps {
  title: string;
  canonicalUrl: string;
  markdownUrl: string;
  githubUrl: string;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function BlogActions({
  title,
  canonicalUrl,
  markdownUrl,
  githubUrl,
}: BlogActionsProps) {
  const [message, setMessage] = useState('');
  const prompt = `Read ${markdownUrl}, I want to ask questions about it.`;
  const encodedUrl = encodeURIComponent(canonicalUrl);

  const notify = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2200);
  };

  const handleCopyLink = async () => {
    await copyText(canonicalUrl);
    notify('Link copied');
  };

  const handleCopyPage = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error('Markdown could not be loaded');
      await copyText(await response.text());
      notify('Page copied as Markdown');
    } catch {
      notify('Page could not be copied');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: canonicalUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await copyText(canonicalUrl);
    notify('Sharing is unavailable — link copied');
  };

  const aiLinks = [
    {
      label: 'View as Markdown',
      icon: 'markdown-line',
      href: markdownUrl,
    },
    {
      label: 'Open in GitHub',
      icon: 'github-line',
      href: githubUrl,
    },
    {
      label: 'Open in ChatGPT',
      icon: 'openai-line',
      href: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q: prompt })}`,
    },
    {
      label: 'Open in Claude',
      icon: 'sparkling-2-line',
      href: `https://claude.ai/new?${new URLSearchParams({ q: prompt })}`,
    },
    {
      label: 'Open in Cursor',
      icon: 'cursor-line',
      href: `https://cursor.com/link/prompt?${new URLSearchParams({ text: prompt })}`,
    },
    {
      label: 'Open in Grok',
      icon: 'twitter-x-line',
      href: `https://grok.com/?${new URLSearchParams({ q: prompt })}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <details className="group relative">
        <summary className="flex h-8 cursor-pointer list-none items-center gap-2 bg-zinc-800 px-3 text-xs text-zinc-200 marker:hidden hover:bg-zinc-700 [&::-webkit-details-marker]:hidden">
          <Icon icon="file-copy-line" />
          <span className="hidden sm:inline">Copy page</span>
          <Icon icon="arrow-down-s-line" className="transition-transform group-open:rotate-180" />
        </summary>
        <div className="absolute right-0 top-10 z-50 w-52 border border-zinc-700 bg-zinc-900 p-1 shadow-2xl">
          <button
            type="button"
            onClick={handleCopyPage}
            className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Icon icon="clipboard-line" className="text-zinc-500" />
            Copy Markdown
          </button>
          <div className="my-1 h-px bg-zinc-800" />
          {aiLinks.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Icon icon={icon} className="text-zinc-500" />
              {label}
            </a>
          ))}
        </div>
      </details>

      <details className="group relative">
        <summary
          aria-label="Share"
          className="grid size-8 cursor-pointer list-none place-items-center bg-zinc-800 text-zinc-300 marker:hidden hover:bg-zinc-700 hover:text-white [&::-webkit-details-marker]:hidden"
        >
          <Icon icon="share-2-line" />
        </summary>
        <div className="absolute right-0 top-10 z-50 w-48 border border-zinc-700 bg-zinc-900 p-1 shadow-2xl">
          <button type="button" onClick={handleCopyLink} className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Icon icon="link" className="text-zinc-500" />Copy link
          </button>
          <a href={`https://x.com/intent/tweet?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Icon icon="twitter-x-line" className="text-zinc-500" />Share on X
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Icon icon="linkedin-line" className="text-zinc-500" />Share on LinkedIn
          </a>
          <button type="button" onClick={handleNativeShare} className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Icon icon="more-line" className="text-zinc-500" />Other app
          </button>
        </div>
      </details>

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-200 shadow-2xl transition-all ${message ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      >
        {message}
      </div>
    </div>
  );
}
