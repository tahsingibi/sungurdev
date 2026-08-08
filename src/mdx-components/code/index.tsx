import hljs from 'highlight.js';
import { FileIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { CopyButton } from './copy-button';

export default function Code(props: ComponentPropsWithoutRef<'code'>) {
  const className = props.className || '';

  // `language-<dil>/filename=<dosya_adi>` formatını eşleştirmek için regex
  const matches = className.match(
    /language-(?<lang>[^/]+)(?:\/filename=(?<fileName>.+))?/
  );

  // language ve fileName ayrıştırma
  const language = matches?.groups?.lang || '';
  const fileName = matches?.groups?.fileName || '';

  const code = String(props.children ?? '');
  const highlightedCode = hljs.highlightAuto(
    code,
    language ? [language] : undefined,
  ).value;

  const codeElement = (
    <code
      className={`language-${language} whitespace-pre font-mono text-xs font-normal leading-6 slashed-zero`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );

  return (
    <div className="my-7 w-full! max-w-full overflow-hidden rounded-[10px] border border-[var(--code-border)] bg-[var(--code-background)] shadow-[0_1px_0_rgb(255_255_255/0.05)_inset]">
      {fileName && (
        <div className="flex h-10 items-center justify-between border-b border-[var(--code-border)] px-2">
          <div className="flex min-w-0 items-center gap-2 px-1.5">
            <FileIcon aria-hidden="true" className="size-3.5 shrink-0 text-[var(--code-muted)]" />
            <span className="truncate font-mono text-[11px] text-[var(--code-muted)]">
              {fileName}
            </span>
          </div>
          <CopyButton text={code} compact />
        </div>
      )}
      <pre className="relative m-0! max-h-[32rem]! overflow-auto! bg-transparent! p-4 text-[var(--code-foreground)] sm:p-5 [&::-webkit-scrollbar-thumb]:bg-[var(--code-border)] [&::-webkit-scrollbar-track]:bg-[var(--code-background)] [&::-webkit-scrollbar]:size-2">
        {!fileName && (
          <CopyButton text={code} compact className="absolute right-1.5 top-1.5 z-10" />
        )}
        {codeElement}
      </pre>
    </div>
  );
}
