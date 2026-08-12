"use client";

import { CodeBlockPreview } from "@/components/custom/code-block";
import { useEffect, useRef, useState } from "react";

const CLICK_INSIDE_OUTSIDE_CODE = `<div id="click-area">
  <div id="target">Click here</div>
  <output id="result">Click somewhere</output>
</div>

<script>
  const clickArea = document.getElementById('click-area');
  const target = document.getElementById('target');
  const result = document.getElementById('result');

  clickArea.addEventListener('click', (event) => {
    if (event.composedPath().includes(target)) {
      result.innerText = 'Click inside';
    } else {
      target.dispatchEvent(new CustomEvent('outside'));
    }
  });

  target.addEventListener('outside', () => {
    result.innerText = 'Click outside';
  });
</script>`;

function ClickInsideOutsidePreview() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("Click somewhere");

  useEffect(() => {
    const surface = surfaceRef.current;
    const target = targetRef.current;

    if (!surface || !target) return;
    const targetElement = target;

    function handleClick(event: MouseEvent) {
      if (event.composedPath().includes(targetElement)) {
        setResult("Click inside");
      } else {
        targetElement.dispatchEvent(new CustomEvent("outside"));
      }
    }

    function handleOutside() {
      setResult("Click outside");
    }

    surface.addEventListener("click", handleClick);
    targetElement.addEventListener("outside", handleOutside);

    return () => {
      surface.removeEventListener("click", handleClick);
      targetElement.removeEventListener("outside", handleOutside);
    };
  }, []);

  return (
    <div
      ref={surfaceRef}
      className="flex min-h-56 w-full max-w-xl cursor-crosshair flex-col items-center justify-center gap-5 rounded-lg border border-dashed border-border bg-muted/35 p-6 text-center"
    >
      <div ref={targetRef}>
        Click here
      </div>
      <output
        aria-live="polite"
        className="min-w-36 rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-foreground"
      >
        {result}
      </output>
      <p className="text-xs text-muted-foreground">
        Click the button, or an empty spot in this area.
      </p>
    </div>
  );
}

export function ComponentPreview({ name }: { name: string }) {
  if (name === "click-inside-outside") {
    return (
      <CodeBlockPreview
        preview={<ClickInsideOutsidePreview />}
        code={CLICK_INSIDE_OUTSIDE_CODE}
        language="html"
      />
    );
  }

  return (
    <CodeBlockPreview
      preview={<p className="text-sm text-muted-foreground">{name} preview</p>}
      code={`// A preview for "${name}" isn't registered yet.`}
      language="tsx"
    />
  );
}
