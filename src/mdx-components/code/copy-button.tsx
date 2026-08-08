'use client';

import { Icon } from '@/src/components/icon';
import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="group relative flex h-8 items-center gap-2 overflow-hidden border border-zinc-700 bg-zinc-950 px-2 font-mono text-[10px] text-zinc-400 hover:border-zinc-600 hover:text-white active:translate-y-px"
      onClick={handleCopy}
      data-copied={copied}
    >
      <Icon icon={copied ? 'check-line' : 'file-copy-line'} />
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
