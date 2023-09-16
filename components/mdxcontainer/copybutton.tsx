"use client";
import { useState } from "react";
import styles from './style.module.scss'

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
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
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
