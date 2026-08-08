import { Icon } from '@/src/components/icon';
import hljs from 'highlight.js';
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

  const fileTypeIcons: Record<string, string> = {
    aac: 'aac',
    ai: 'ai',
    bmp: 'bmp',
    cs: 'cs',
    css: 'css',
    csv: 'csv',
    doc: 'doc',
    docx: 'docx',
    exe: 'exe',
    gif: 'gif',
    heic: 'heic',
    html: 'html5-fill',
    link: 'link',
    java: 'java',
    jpg: 'jpg',
    js: 'javascript-fill',
    javascript: 'javascript-fill',
    command: 'terminal-fill',
    bat: 'terminal-fill',
    json: 'json',
    jsx: 'jsx',
    key: 'key',
    m4p: 'm4p',
    md: 'md',
    mdx: 'mdx',
    mov: 'mov',
    mp3: 'mp3',
    mp4: 'mp4',
    otf: 'otf',
    pdf: 'pdf',
    php: 'php',
    png: 'png',
    ppt: 'ppt',
    pptx: 'pptx',
    psd: 'psd',
    py: 'py',
    raw: 'raw',
    rb: 'rb',
    sass: 'sass',
    scss: 'scss',
    sh: 'sh',
    sql: 'sql',
    svg: 'svg',
    tiff: 'tiff',
    tsx: 'tsx',
    typescript: 'tsx',
    ttf: 'ttf',
    txt: 'txt',
    wav: 'wav',
    woff: 'woff',
    xls: 'xls',
    xlsx: 'xlsx',
    xml: 'xml',
    yml: 'yml',
  };

  return (
    <div className="my-7 w-full! max-w-full overflow-hidden border border-zinc-800 bg-zinc-950 shadow-[0_18px_50px_rgb(0_0_0/0.2)]">
      <div className="flex min-h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-3">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-zinc-700" />
            <span className="size-1.5 rounded-full bg-zinc-700" />
            <span className="size-1.5 rounded-full bg-zinc-700" />
          </span>
          <span className="truncate font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            {language && (
              <Icon
                icon={`${fileTypeIcons?.[language] || language}`}
                className="me-2 text-zinc-400"
              />
            )}
            {fileName || language || 'plain text'}
          </span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="m-0! max-h-[32rem]! overflow-auto! bg-zinc-950 p-5 text-zinc-300 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar]:size-2">
        <code
          className={`language-${language} whitespace-pre font-mono text-xs font-normal leading-6 slashed-zero`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
