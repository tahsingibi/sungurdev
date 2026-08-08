'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-2xl text-[var(--code-foreground)]">{count}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((value) => value - 1)}
          className="flex size-8 items-center justify-center rounded-[6px] border border-[var(--code-border)] text-[var(--code-foreground)] transition-colors hover:bg-[var(--code-border)]/35"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="flex size-8 items-center justify-center rounded-[6px] border border-[var(--code-border)] text-[var(--code-foreground)] transition-colors hover:bg-[var(--code-border)]/35"
        >
          +
        </button>
      </div>
    </div>
  );
}
