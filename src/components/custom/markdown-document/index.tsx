import {
  CodeBlock,
  CodeBlockCommand,
  type CodeBlockCommandProps,
} from "@/components/custom/code-block";
import { ComponentPreview } from "@/components/custom/component-preview";
import Link from "next/link";
import type { JSX, ReactNode } from "react";

interface MarkdownDocumentProps {
  source: string;
}

interface Block {
  type: "heading" | "paragraph" | "code" | "command" | "preview" | "list";
  content: string;
  level?: number;
  language?: string;
  filename?: string;
  command?: CodeBlockCommandProps;
  previewName?: string;
}

function parseFenceInfo(source: string) {
  const normalizedSource = source.trim();
  const metadataStart = normalizedSource.indexOf("/");
  const language =
    (metadataStart === -1
      ? normalizedSource
      : normalizedSource.slice(0, metadataStart)) || "text";
  const metadata = metadataStart === -1 ? "" : normalizedSource.slice(metadataStart + 1);
  const readMetadata = (key: "filename") =>
    metadata.match(
      new RegExp(`(?:^|/)${key}=(.*?)(?=/filename=|$)`),
    )?.[1];
  const filename = readMetadata("filename");

  return { language, filename };
}

function parseCommand(source: string): CodeBlockCommandProps {
  const command: CodeBlockCommandProps = {};
  const expression = /\b(prompt|pnpm|yarn|npm|bun)\s*=\s*(["'])([\s\S]*?)\2/g;

  for (const match of source.matchAll(expression)) {
    const key = match[1] as keyof CodeBlockCommandProps;
    command[key] = match[3].replaceAll("\\n", "\n");
  }

  return command;
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

    if (line.trimStart().startsWith("<CodeBlockCommand")) {
      const component = [line];
      while (index < lines.length && !component.at(-1)?.includes("/>")) {
        index += 1;
        if (index < lines.length) component.push(lines[index]);
      }
      blocks.push({
        type: "command",
        content: component.join("\n"),
        command: parseCommand(component.join("\n")),
      });
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith("<ComponentPreview")) {
      const component = [line];
      while (index < lines.length && !component.at(-1)?.includes("/>")) {
        index += 1;
        if (index < lines.length) component.push(lines[index]);
      }
      const componentSource = component.join("\n");
      blocks.push({
        type: "preview",
        content: componentSource,
        previewName:
          componentSource.match(/\bname\s*=\s*["']([^"']+)["']/)?.[1] ||
          "component",
      });
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const { language, filename } = parseFenceInfo(line.slice(3));
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: "code",
        content: code.join("\n"),
        language,
        filename,
      });
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
      !lines[index].trimStart().startsWith("<CodeBlockCommand") &&
      !lines[index].trimStart().startsWith("<ComponentPreview") &&
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

function renderInline(content: string): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`\n]+`|\*\*[^*]+\*\*|<a\s+[^>]*>.*?<\/a>)/g;

  return content.split(pattern).filter(Boolean).map((part, index) => {
    const markdownLink = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (markdownLink) {
      return (
        <Link
          key={index}
          href={markdownLink[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          {markdownLink[1]}
        </Link>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("<a")) {
      const href = part.match(/href=["']([^"']+)["']/)?.[1];
      const label = part.replace(/^<a\s+[^>]*>/, "").replace(/<\/a>$/, "");
      if (href) {
        return (
          <Link key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
            {label}
          </Link>
        );
      }
    }

    return part;
  });
}

export function MarkdownDocument({ source }: MarkdownDocumentProps) {
  return (
    <div className="text-base leading-7 text-foreground/75">
      {parseBlocks(source).map((block, index) => {
        if (block.type === "command") {
          return <CodeBlockCommand key={index} {...block.command} />;
        }

        if (block.type === "preview") {
          return (
            <ComponentPreview key={index} name={block.previewName || "component"} />
          );
        }

        if (block.type === "code") {
          return (
            <CodeBlock
              key={index}
              code={block.content}
              language={block.language}
              filename={block.filename}
            />
          );
        }

        if (block.type === "heading") {
          const Heading = `h${Math.min(block.level ?? 2, 6)}` as keyof JSX.IntrinsicElements;
          return (
            <Heading key={index} className="mb-3 mt-10 text-xl font-medium text-foreground first:mt-0 sm:text-2xl">
              {renderInline(block.content)}
            </Heading>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="my-5 list-disc space-y-2 pl-6 marker:text-muted-foreground">
              {block.content.split("\n").map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="my-5 whitespace-pre-wrap first:mt-0 last:mb-0">
            {renderInline(block.content)}
          </p>
        );
      })}
    </div>
  );
}
