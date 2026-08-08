'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/src/components/icon';
import { Fragment, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Clipboard is unavailable');
}

export default function BlogActions({
  title,
  canonicalUrl,
  markdownUrl,
  githubUrl,
}: BlogActionsProps) {
  const [pageCopied, setPageCopied] = useState(false);
  const copyStateTimeout = useRef<number | undefined>(undefined);
  const prompt = `Read ${markdownUrl}, I want to ask questions about it.`;
  const encodedUrl = encodeURIComponent(canonicalUrl);

  useEffect(
    () => () => window.clearTimeout(copyStateTimeout.current),
    [],
  );

  const handleCopyLink = async () => {
    try {
      await copyText(canonicalUrl);
    } catch {
      toast.error('Link could not be copied');
    }
  };

  const handleCopyPage = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error('Markdown could not be loaded');
      await copyText(await response.text());
      window.clearTimeout(copyStateTimeout.current);
      setPageCopied(true);
      copyStateTimeout.current = window.setTimeout(() => setPageCopied(false), 2000);
    } catch {
      toast.error('Page could not be copied');
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

    try {
      await copyText(canonicalUrl);
      toast.info('Sharing is unavailable — link copied');
    } catch {
      toast.error('Sharing is unavailable');
    }
  };

  const pageLinks = [
    { label: 'View as Markdown', icon: 'markdown-line', href: markdownUrl },
    { label: 'Open in GitHub', icon: 'github-line', href: githubUrl },
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

  const itemClassName =
    'min-h-9 rounded-[5px] px-3 py-2 font-mono text-xs text-muted-foreground focus:bg-accent focus:text-foreground data-highlighted:bg-accent data-highlighted:text-foreground';

  return (
    <div className="flex items-center">
      <div className="flex h-10 items-stretch border-x border-foreground/15 bg-background shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] sm:h-11">
        <button
          type="button"
          aria-label="Copy page as Markdown"
          onClick={handleCopyPage}
          className="flex items-center gap-2.5 px-3.5 font-mono text-xs text-foreground transition-colors hover:bg-accent sm:px-4"
        >
          <Icon icon={pageCopied ? 'check-line' : 'copy'} />
          <span aria-live="polite" className="hidden sm:inline">
            {pageCopied ? 'Copied' : 'Copy page'}
          </span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open copy page menu"
            className="grid w-9 place-items-center border-l border-foreground/15 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:w-10"
          >
            <Icon icon="arrow-down-s-line" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-60 rounded-[8px] border border-foreground/15 bg-popover/98 p-1.5 text-popover-foreground shadow-[0_18px_45px_rgb(0_0_0/0.18)] ring-0 backdrop-blur-xl"
          >
            {pageLinks.map(({ label, icon, href }, index) => (
              <Fragment key={label}>
                {index === 2 && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  render={<a href={href} target="_blank" rel="noopener noreferrer" />}
                  className={itemClassName}
                >
                  <Icon icon={icon} className="text-muted-foreground" />
                  {label}
                </DropdownMenuItem>
              </Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Share"
          className="grid size-10 place-items-center border-l border-foreground/15 bg-background text-muted-foreground shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:size-11"
        >
          <Icon icon="share-2-line" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="w-56 rounded-[8px] border border-foreground/15 bg-popover/98 p-1.5 text-popover-foreground shadow-[0_18px_45px_rgb(0_0_0/0.18)] ring-0 backdrop-blur-xl"
        >
          <DropdownMenuItem onClick={handleCopyLink} className={itemClassName}>
            <Icon icon="link" className="text-muted-foreground" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<a href={`https://x.com/intent/tweet?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" />}
            className={itemClassName}
          >
            <Icon icon="twitter-x-line" className="text-muted-foreground" />
            Share on X
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<a href={`https://www.linkedin.com/sharing/share-offsite?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" />}
            className={itemClassName}
          >
            <Icon icon="linkedin-line" className="text-muted-foreground" />
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNativeShare} className={itemClassName}>
            <Icon icon="more-line" className="text-muted-foreground" />
            Other app
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
