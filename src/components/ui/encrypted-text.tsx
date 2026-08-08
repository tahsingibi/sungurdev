"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /** Time in milliseconds between revealing each real character. */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /** Time in milliseconds between gibberish flips. */
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
};

type AnimationState = {
  source: string;
  revealCount: number;
  characters: string[];
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function randomCharacter(charset: string): string {
  return charset.charAt(Math.floor(Math.random() * charset.length));
}

function deterministicCharacters(text: string, charset: string): string[] {
  return Array.from(text, (character, index) => {
    if (character === " ") return " ";
    if (!charset.length) return character;

    const seed = character.charCodeAt(0) + index * 31 + text.length * 17;
    return charset.charAt(seed % charset.length);
  });
}

function initialState(text: string, charset: string): AnimationState {
  return {
    source: text,
    revealCount: 0,
    characters: deterministicCharacters(text, charset),
  };
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animation, setAnimation] = useState<AnimationState>(() =>
    initialState(text, charset),
  );

  useEffect(() => {
    if (!isInView) return;

    let animationFrame = 0;
    let startTime: number | null = null;
    let lastFlipTime = 0;
    let lastRevealCount = -1;

    const update = (now: number) => {
      if (startTime === null) {
        startTime = now;
        lastFlipTime = now;
        setAnimation(initialState(text, charset));
      }

      const revealCount = Math.min(
        text.length,
        Math.floor((now - startTime) / Math.max(1, revealDelayMs)),
      );
      const shouldFlip = now - lastFlipTime >= Math.max(0, flipDelayMs);

      if (revealCount !== lastRevealCount || shouldFlip) {
        setAnimation((current) => {
          const characters =
            current.source === text
              ? [...current.characters]
              : deterministicCharacters(text, charset);

          if (shouldFlip) {
            for (let index = revealCount; index < text.length; index += 1) {
              characters[index] =
                text[index] === " " || !charset.length
                  ? text[index]
                  : randomCharacter(charset);
            }
          }

          return { source: text, revealCount, characters };
        });

        lastRevealCount = revealCount;
        if (shouldFlip) lastFlipTime = now;
      }

      if (revealCount < text.length) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  const visibleAnimation =
    animation.source === text ? animation : initialState(text, charset);

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {text.split("").map((character, index) => {
        const isRevealed = index < visibleAnimation.revealCount;
        const displayCharacter = isRevealed
          ? character
          : visibleAnimation.characters[index];

        return (
          <span
            key={`${index}-${character}`}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayCharacter}
          </span>
        );
      })}
    </motion.span>
  );
};
