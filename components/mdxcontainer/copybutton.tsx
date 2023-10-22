"use client";
import { useState } from "react";
import styles from './style.module.scss'
import copyClipboard from "@/utils/copyClipboard";
import { copy as copyIcon, check } from "@/utils";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await copyClipboard(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className={styles.copy}>
      <span>{isCopied ? check : copyIcon}</span>
    </button>
  );
};
