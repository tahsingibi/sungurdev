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
  if (!copied) throw new Error("Clipboard kullanılamıyor");
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
      label: "Open in ChatGPT",
      href: `https://chatgpt.com/?${chatGptQuery}`,
    },
    {
      label: "Open in Claude",
      href: `https://claude.ai/new?${query}`,
    },
    {
      label: "Open in Cursor",
      href: `https://cursor.com/link/prompt?${cursorQuery}`,
    },
    { label: "Open in Grok", href: `https://grok.com/?${query}` },
  ];

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: canonicalUrl });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        toast.error("Paylaşım açılamadı");
      }
      return;
    }

    try {
      await copyText(canonicalUrl);
      toast.info("Web Share desteklenmiyor; bağlantı panoya kopyalandı.");
    } catch {
      toast.error("Bu tarayıcı paylaşım veya pano erişimini desteklemiyor.");
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" className="rounded-none">
            <Share2 className="size-4" /> Share{" "}
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={async () => {
              try {
                await copyText(canonicalUrl);
                toast.success("Bağlantı panoya kopyalandı");
              } catch {
                toast.error("Bağlantı kopyalanamadı");
              }
            }}
          >
            <LinkIcon /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`https://x.com/intent/tweet?${new URLSearchParams({ text: title, url: canonicalUrl })}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink /> Share on X
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite?${new URLSearchParams({ url: canonicalUrl })}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink /> Share on LinkedIn
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleNativeShare}>
            <Ellipsis /> Other app
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" className="rounded-none">
            <Copy className="size-4" /> Copy page{" "}
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuItem asChild>
            <Link href={markdownUrl} target="_blank" rel="noopener noreferrer">
              <FileText /> View as Markdown
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Open in GitHub
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
                  throw new Error("Markdown could not be retrieved.");
                await copyText(await response.text());
                toast("The page's Markdown content has been copied!", {
                  position: "bottom-center",
                  closeButton: false,
                });
              } catch {
                toast.error("The Markdown content could not be copied!");
              }
            }}
          >
            <Clipboard /> Copy Markdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
