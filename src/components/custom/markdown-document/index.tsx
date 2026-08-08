import type { JSX, ReactNode } from "react";

interface MarkdownDocumentProps {
  source: string;
}

interface Block {
  type: "heading" | "paragraph" | "code" | "list";
  content: string;
  level?: number;
  language?: string;
}

function parseBlocks(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).split("/")[0];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", content: code.join("\n"), language });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, content: heading[2] });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", content: items.join("\n") });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("```") &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^[-*]\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", content: paragraph.join("\n") });
  }

  return blocks;
}

export function MarkdownDocument({ source }: MarkdownDocumentProps) {
  return (
    <div className="space-y-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
      {parseBlocks(source).map((block, index) => {
        if (block.type === "code") {
          return (
            <pre key={index} className="overflow-x-auto rounded-md border bg-zinc-950 p-4 text-sm text-zinc-100">
              <code data-language={block.language}>{block.content}</code>
            </pre>
          );
        }

        if (block.type === "heading") {
          const Heading = `h${Math.min(block.level ?? 2, 6)}` as keyof JSX.IntrinsicElements;
          return <Heading key={index} className="pt-5 text-xl font-semibold text-foreground">{block.content}</Heading>;
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {block.content.split("\n").map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }

        return <p key={index} className="whitespace-pre-wrap">{block.content}</p>;
      }) as ReactNode}
    </div>
  );
}
