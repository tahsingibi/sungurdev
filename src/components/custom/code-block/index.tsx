"use client";

import {
  getCodeLanguageIcon,
  PACKAGE_MANAGER_ICONS,
  type PackageManagerIconName,
} from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { codeToHtml, type BundledLanguage } from "shiki/bundle/full";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

interface CodeBlockPreviewProps extends CodeBlockProps {
  preview: ReactNode;
}

export interface CodeBlockCommandProps {
  prompt?: string;
  pnpm?: string;
  yarn?: string;
  npm?: string;
  bun?: string;
}

type PackageManager = PackageManagerIconName;
type CopyStatus = "idle" | "success" | "error";

const PACKAGE_MANAGER_KEY = "preferred-package-manager";
const PACKAGE_MANAGER_EVENT = "package-manager-change";
const PACKAGE_MANAGER_ORDER: PackageManager[] = [
  "prompt",
  "pnpm",
  "yarn",
  "npm",
  "bun",
];

function getPackageManagerSnapshot(): PackageManager {
  if (typeof window === "undefined") return "pnpm";

  try {
    const value = window.localStorage.getItem(PACKAGE_MANAGER_KEY);
    return PACKAGE_MANAGER_ORDER.includes(value as PackageManager)
      ? (value as PackageManager)
      : "pnpm";
  } catch {
    return "pnpm";
  }
}

function subscribeToPackageManager(onStoreChange: () => void) {
  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(PACKAGE_MANAGER_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(PACKAGE_MANAGER_EVENT, handleChange);
  };
}

function savePackageManager(value: PackageManager) {
  try {
    window.localStorage.setItem(PACKAGE_MANAGER_KEY, value);
  } catch {
    // The selected tab still works when storage is unavailable.
  }

  window.dispatchEvent(new Event(PACKAGE_MANAGER_EVENT));
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

function CopyCodeButton({ value }: { value: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleCopy() {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);

    try {
      await copyText(value);
      setStatus("success");
    } catch {
      setStatus("error");
    }

    resetTimer.current = window.setTimeout(() => setStatus("idle"), 1800);
  }

  const label =
    status === "success"
      ? "Kod kopyalandı"
      : status === "error"
        ? "Kod kopyalanamadı"
        : "Kodu kopyala";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      onClick={handleCopy}
      className="relative size-8 shrink-0 rounded-lg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          initial={{ opacity: 0, scale: 0.65, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.65, rotate: 12 }}
          transition={{ duration: 0.15 }}
          className={
            status === "success"
              ? "text-emerald-500"
              : status === "error"
                ? "text-destructive"
                : "text-muted-foreground"
          }
        >
          {status === "success" ? (
            <Check className="size-4" />
          ) : status === "error" ? (
            <X className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : label}
      </span>
    </Button>
  );
}

const SHIKI_LANGUAGE_ALIASES: Record<string, BundledLanguage> = {
  javascript: "javascript",
  jsx: "jsx",
  typescript: "typescript",
  tsx: "tsx",
  bash: "bash",
  shell: "shell",
  bat: "bat",
  powershell: "powershell",
  html: "html",
  css: "css",
  json: "json",
};

function toShikiLanguage(language?: string): BundledLanguage | null {
  if (!language) return null;
  return SHIKI_LANGUAGE_ALIASES[language.toLowerCase()] ?? null;
}

function useHighlightedCode(code: string, language?: string) {
  const lang = toShikiLanguage(language);
  const highlightKey = lang ? `${lang}:${code}` : null;
  const [highlight, setHighlight] = useState<{
    key: string;
    html: string;
  } | null>(null);

  useEffect(() => {
    if (!lang || !highlightKey) return;

    let cancelled = false;
    codeToHtml(code, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      structure: "inline",
    }).then((html) => {
      if (!cancelled) setHighlight({ key: highlightKey, html });
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang, highlightKey]);

  return highlight?.key === highlightKey ? highlight.html : null;
}

function CodeContent({
  code,
  language,
  compact = false,
}: {
  code: string;
  language?: string;
  compact?: boolean;
}) {
  const highlighted = useHighlightedCode(code, language);
  const lineCount = Math.max(1, code.split("\n").length);
  const verticalPadding = compact ? 24 : 32;
  const viewportHeight = Math.min(384, lineCount * 24 + verticalPadding);

  return (
    <ScrollArea
      className="overflow-hidden rounded-xl"
      viewportClassName="!overflow-x-hidden"
      style={{ height: viewportHeight }}
    >
      <pre
        className={
          compact
            ? "m-0 w-full min-w-0 whitespace-pre-wrap wrap-break-word p-3 font-mono text-xs leading-6 text-foreground/85"
            : "m-0 w-full min-w-0 whitespace-pre-wrap wrap-break-word p-4 pr-12 font-mono text-xs leading-6 text-foreground/85 sm:pr-14"
        }
      >
        {highlighted ? (
          <code
            data-language={language || "text"}
            className="block min-w-0 whitespace-pre-wrap break-words font-mono [overflow-wrap:anywhere] [&_span]:whitespace-pre-wrap [&_span]:break-words [&_span]:text-(--shiki-light) [&_span]:[overflow-wrap:anywhere] dark:[&_span]:text-(--shiki-dark)"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <code
            data-language={language || "text"}
            className="block min-w-0 whitespace-pre-wrap break-words font-mono [overflow-wrap:anywhere]"
          >
            {code}
          </code>
        )}
      </pre>
    </ScrollArea>
  );
}

function CodeFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-xl border border-border bg-background dark:bg-zinc-950">
      {children}
    </div>
  );
}

export function CodeBlock({
  code,
  language = "text",
  filename,
}: CodeBlockProps) {
  const { Icon: LanguageIcon } = getCodeLanguageIcon(language);

  return (
    <div className="my-6 rounded-2xl border border-border bg-muted/55 p-2 shadow-soft dark:bg-zinc-900/70">
      {filename ? (
        <div className="flex min-h-8 pb-2 items-center gap-3 px-2">
          <LanguageIcon className="size-4" aria-hidden="true" />
          <span className="min-w-0 flex-1 break-all font-mono text-sm text-muted-foreground">
            {filename}
          </span>
          <CopyCodeButton value={code} />
        </div>
      ) : null}

      <CodeFrame>
        {filename ? null : (
          <div className="absolute right-2 top-2 z-10">
            <CopyCodeButton value={code} />
          </div>
        )}
        <CodeContent code={code} language={language} />
      </CodeFrame>
    </div>
  );
}

export function CodeBlockPreview({
  preview,
  code,
  language = "tsx",
}: CodeBlockPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const blockId = useId();

  return (
    <div className="my-6 rounded-2xl border border-border bg-muted/55 px-2 pb-2 shadow-soft dark:bg-zinc-900/70 ">
      <div
        role="tablist"
        aria-label="Bileşen görünümü"
        className="flex h-12 items-stretch gap-1 px-2"
      >
        {(["preview", "code"] as const).map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className="relative px-2.5 text-base capitalize text-muted-foreground transition-colors hover:text-foreground aria-selected:text-foreground"
            >
              {tab}
              {isActive ? (
                <motion.span
                  layoutId={`preview-tab-${blockId}`}
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground"
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <CodeFrame>
        {activeTab === "preview" ? (
          <div
            role="tabpanel"
            aria-label="Preview"
            className="grid min-h-72 place-items-center p-6 sm:min-h-80"
          >
            {preview}
          </div>
        ) : (
          <div role="tabpanel" aria-label="Code">
            <div className="absolute right-2 top-2 z-10">
              <CopyCodeButton value={code} />
            </div>
            <CodeContent code={code} language={language} />
          </div>
        )}
      </CodeFrame>
    </div>
  );
}

export function CodeBlockCommand({
  prompt,
  pnpm,
  yarn,
  npm,
  bun,
}: CodeBlockCommandProps) {
  const commands = { prompt, pnpm, yarn, npm, bun };
  const availableManagers = PACKAGE_MANAGER_ORDER.filter(
    (manager) => commands[manager],
  );
  const packageManager = useSyncExternalStore<PackageManager>(
    subscribeToPackageManager,
    getPackageManagerSnapshot,
    () => "pnpm",
  );
  const activeManager = availableManagers.includes(packageManager)
    ? packageManager
    : availableManagers[0];
  const activeCommand = activeManager ? commands[activeManager] || "" : "";
  const blockId = useId();

  if (!activeManager) return null;

  const ActivePackageManagerIcon = PACKAGE_MANAGER_ICONS[activeManager];

  return (
    <div className="my-6 rounded-2xl border border-border bg-muted/55 p-2 shadow-soft dark:bg-zinc-900/70">
      <div className="relative flex items-center pr-11 gap-2 min-h-10!">
        <div className="flex w-10 shrink-0 h-fit items-center justify-center text-muted-foreground">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeManager}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.14 }}
            >
              <ActivePackageManagerIcon className="size-4" aria-hidden="true" />
            </motion.span>
          </AnimatePresence>
        </div>

        <div
          role="tablist"
          aria-label="Paket yöneticisi"
          className="flex min-w-0 flex-1 pt-1 items-stretch overflow-x-auto gap-4"
        >
          {availableManagers.map((manager) => {
            const isActive = manager === activeManager;

            return (
              <button
                key={manager}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => savePackageManager(manager)}
                className="relative bg-transparent! pb-2 px-0!"
              >
                {manager}
                {isActive ? (
                  <motion.span
                    layoutId={`package-tab-${blockId}`}
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground"
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          <CopyCodeButton value={activeCommand} />
        </div>
      </div>

      <CodeFrame>
        <CodeContent
          code={activeCommand}
          language={activeManager === "prompt" ? "text" : "bash"}
          compact
        />
      </CodeFrame>
    </div>
  );
}
