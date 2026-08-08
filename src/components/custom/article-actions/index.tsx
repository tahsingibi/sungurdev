"use client";

import {
  Bot,
  ChevronDown,
  Clipboard,
  Copy,
  Ellipsis,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  MousePointer2,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    { label: "Open in ChatGPT", href: `https://chatgpt.com/?${chatGptQuery}`, icon: Bot },
    { label: "Open in Claude", href: `https://claude.ai/new?${query}`, icon: Bot },
    { label: "Open in Cursor", href: `https://cursor.com/link/prompt?${cursorQuery}`, icon: MousePointer2 },
    { label: "Open in Grok", href: `https://grok.com/?${query}`, icon: Bot },
  ];

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: canonicalUrl });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-accent">
            <Share2 className="size-4" /> Share <ChevronDown className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Share</DropdownMenuLabel>
          <DropdownMenuSeparator />
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
            <a href={`https://x.com/intent/tweet?${new URLSearchParams({ text: title, url: canonicalUrl })}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Share on X
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://www.linkedin.com/sharing/share-offsite?${new URLSearchParams({ url: canonicalUrl })}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Share on LinkedIn
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleNativeShare}>
            <Ellipsis /> Other app
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-accent">
            <Copy className="size-4" /> Copy page <ChevronDown className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel>Copy page</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href={markdownUrl} target="_blank" rel="noopener noreferrer">
              <FileText /> View as Markdown
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink /> Open in GitHub
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {aiTargets.map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem key={label} asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon /> {label}
              </a>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={async () => {
              try {
                const response = await fetch(markdownUrl);
                if (!response.ok) throw new Error("Markdown alınamadı");
                await copyText(await response.text());
                toast.success("Sayfanın Markdown içeriği kopyalandı");
              } catch {
                toast.error("Markdown içeriği kopyalanamadı");
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
