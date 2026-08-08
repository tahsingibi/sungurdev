'use client';

import { Icon } from '@/src/components/icon';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'success' | 'error';

interface CopyButtonProps {
  text: string;
  compact?: boolean;
  className?: string;
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
}

export function CopyButton({
  text,
  compact = false,
  className,
  onCopySuccess,
  onCopyError,
}: CopyButtonProps) {
  const [state, setState] = useState<CopyState>('idle');
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const updateState = (nextState: CopyState) => {
    window.clearTimeout(timeoutRef.current);
    setState(nextState);
    timeoutRef.current = window.setTimeout(() => setState('idle'), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      updateState('success');
      onCopySuccess?.(text);
    } catch (cause) {
      const error = cause instanceof Error ? cause : new Error('Clipboard is unavailable');
      updateState('error');
      onCopyError?.(error);
    }
  };

  const label = state === 'success' ? 'Copied' : state === 'error' ? 'Failed' : 'Copy';
  const icon = state === 'success' ? 'check-line' : state === 'error' ? 'close-line' : 'file-copy-line';

  return (
    <button
      type="button"
      aria-label={`${label} code`}
      className={cn(
        'group relative flex h-7 items-center gap-2 overflow-hidden rounded-[6px] border border-[var(--code-border)] bg-[var(--code-background)] px-2 font-mono text-[10px] text-[var(--code-muted)] transition-colors hover:bg-[var(--code-border)]/35 hover:text-[var(--code-foreground)] active:translate-y-px',
        state === 'error' && 'text-red-600 dark:text-red-300',
        compact && 'size-7 justify-center border-0 px-0',
        className,
      )}
      onClick={handleCopy}
      data-state={state}
    >
      <Icon key={state} icon={icon} className="animate-in zoom-in-75 duration-150" />
      {!compact && <span aria-live="polite">{label}</span>}
    </button>
  );
}
