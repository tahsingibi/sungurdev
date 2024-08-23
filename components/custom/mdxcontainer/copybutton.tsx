"use client";
import { useState } from "react";
import { copyClipboard } from "@/utils";
import { BSIcons } from "@/utils";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await copyClipboard(text);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const icon = isCopied ? "clipboard-check-fill" : "clipboard";

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute right-2.5 top-2.5 aspect-square w-6 h-6 border rounded-lg transition-all duration-1000  block bg-zinc-900 border-zinc-800 text-zinc-400">
      <span><BSIcons icon={icon} className="translate-y-4" /></span>
    </button>
  );
};
