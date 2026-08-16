"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Clipboard,
  Copy,
  Ellipsis,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ArticleActionsProps {
  title: string;
  canonicalUrl: string;
  markdownUrl: string;
  githubUrl: string;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard is unavailable");
}

export function ArticleActions({
  title,
  canonicalUrl,
  markdownUrl,
  githubUrl,
}: ArticleActionsProps) {
  const prompt = `Read ${markdownUrl}, I want to ask questions about the article “${title}”.`;
  const query = new URLSearchParams({ q: prompt });
  const chatGptQuery = new URLSearchParams({ hints: "search", q: prompt });
  const cursorQuery = new URLSearchParams({ text: prompt });

  const aiTargets = [
    {
      label: "open in chatgpt",
      href: `https://chatgpt.com/?${chatGptQuery}`,
    },
    {
      label: "open in claude",
      href: `https://claude.ai/new?${query}`,
    },
    {
      label: "open in cursor",
      href: `https://cursor.com/link/prompt?${cursorQuery}`,
    },
    { label: "open in grok", href: `https://grok.com/?${query}` },
  ];

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: canonicalUrl });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        toast.error("share failed");
      }
      return;
    }

    try {
      await copyText(canonicalUrl);
      toast.info("web share unavailable — link copied instead");
    } catch {
      toast.error("sharing and clipboard unavailable");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs uppercase tracking-[0.16em]"
          >
            <Share2 className="size-3.5" />
            share
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={async () => {
              try {
                await copyText(canonicalUrl);
                toast.success("link copied");
              } catch {
                toast.error("could not copy link");
              }
            }}
          >
            <LinkIcon /> copy link
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`https://x.com/intent/tweet?${new URLSearchParams({ text: title, url: canonicalUrl })}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink /> share on x
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite?${new URLSearchParams({ url: canonicalUrl })}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink /> share on linkedin
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleNativeShare}>
            <Ellipsis /> other app
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs uppercase tracking-[0.16em]"
          >
            <Copy className="size-3.5" />
            copy page
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuItem asChild>
            <Link href={markdownUrl} target="_blank" rel="noopener noreferrer">
              <FileText /> view as markdown
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> open in github
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {aiTargets.map(({ label, href }) => (
            <DropdownMenuItem key={label} asChild>
              <Link href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={async () => {
              try {
                const response = await fetch(markdownUrl);
                if (!response.ok)
                  throw new Error("markdown could not be retrieved");
                await copyText(await response.text());
                toast.success("markdown copied", {
                  position: "bottom-center",
                  closeButton: false,
                });
              } catch {
                toast.error("could not copy markdown");
              }
            }}
          >
            <Clipboard /> copy markdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
