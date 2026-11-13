"use client";

import { useEffect, useState } from "react";

const RAW_URL =
  "https://raw.githubusercontent.com/tahsingibi/igcleaner/main/igcleaner.js";

export function IGCleanerSource() {
  const [code, setCode] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    async function load() {
      try {
        const response = await fetch(RAW_URL, {
          signal: controller.signal,
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer",
        });
        if (!response.ok) return;
        const text = await response.text();
        if (
          !controller.signal.aborted &&
          text.trim() &&
          text.length <= 1_000_000 &&
          !/^\s*</.test(text)
        ) {
          setCode(text);
        }
      } catch {
        // The direct source link remains available on timeout, CORS or network failure.
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void load();
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  async function copy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Users can always open and copy the raw file using the adjacent link.
    }
  }

  return (
    <div className="my-6 rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a
          href={RAW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-4"
        >
          igcleaner.js — kodu aç
        </a>
        {code && (
          <button
            type="button"
            onClick={() => void copy()}
            className="rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {copied ? "Kopyalandı" : "Kodu kopyala"}
          </button>
        )}
      </div>
      {code && (
        <details
          className="border-t border-border"
          onToggle={(event) => setExpanded(event.currentTarget.open)}
        >
          <summary className="cursor-pointer px-4 py-3 text-sm text-muted-foreground">
            Kaynak kodu görüntüle
          </summary>
          {expanded && (
            <pre
              tabIndex={0}
              aria-label="IGCleaner JavaScript kaynak kodu"
              className="max-h-96 overflow-auto border-t border-border bg-muted/30 p-4 text-xs leading-relaxed"
            >
              <code>{code}</code>
            </pre>
          )}
        </details>
      )}
    </div>
  );
}
