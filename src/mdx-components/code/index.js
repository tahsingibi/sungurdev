'use client';
import { Icon } from '@/src/components/icon';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useRef, useState } from 'react';

export default function Code(props) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  const className = props.className || '';

  // `language-<dil>/filename=<dosya_adi>` formatını eşleştirmek için regex
  const matches = className.match(
    /language-(?<lang>[^/]+)(?:\/filename=(?<fileName>.+))?/
  );

  // language ve fileName ayrıştırma
  const language = matches?.groups?.lang || '';
  const fileName = matches?.groups?.fileName || '';

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const highlightedCode = hljs.highlightAuto(props.children, [language]).value;

  const fileTypeIcons = {
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
    <div className="border border-zinc-800 rounded-lg overflow-hidden max-w-full w-full! bg-zinc-900!">
      <div className="flex justify-between bg-transparent p-2 border-b border-zinc-800">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-gray-300 ml-2 font-sans">
            <Icon
              icon={`${fileTypeIcons?.[language] || language}`}
              className="me-2"
            />
            {fileName || language}
          </span>
        </div>
        <button
          type="button"
          className="text-gray-300 hover:text-white group size-7 bg-zinc-900 cursor-pointer active:shadow-inner border border-zinc-700 flex items-center justify-center overflow-hidden rounded-lg relative"
          onClick={handleCopy}
          data-copied={copied}
        >
          <Icon icon="clipboard-line" className="group-data-[copied='true']:scale-0 ease-hover duration-350" />
          <Icon
            icon="clipboard-fill"
            className="absolute opacity-0 transition-all scale-0 group-data-[copied='true']:scale-100 group-data-[copied='true']:opacity-100 ease-hover duration-350"
          />
        </button>
      </div>
      <pre className="p-4 rounded-b-lg overflow-x-auto bg-zinc-950 m-0! max-h-96! overflow-y-auto! [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-zinc-900 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        <code
          ref={codeRef}
          className={`language-${language} text-xs font-light slashed-zero whitespace-pre-wrap leading-relaxed break-all`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
