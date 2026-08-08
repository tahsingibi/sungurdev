import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/src/mdx-components/code/copy-button';
import hljs from 'highlight.js';
import fs from 'node:fs/promises';
import path from 'node:path';

export interface ComponentPreviewProps {
  name: string;
}

export async function ComponentPreview({ name }: ComponentPreviewProps) {
  const { default: Demo } = await import(`@/src/demos/${name}`);
  const filePath = path.join(process.cwd(), 'src', 'demos', name, 'index.tsx');
  const source = (await fs.readFile(filePath, 'utf8')).trim();
  const highlightedCode = hljs.highlightAuto(source, ['typescript']).value;

  return (
    <div className="my-7 w-full! max-w-full overflow-hidden rounded-[10px] border border-[var(--code-border)] bg-[var(--code-background)] shadow-[0_1px_0_rgb(255_255_255/0.05)_inset]">
      <Tabs defaultValue="preview" className="gap-0">
        <div className="flex h-10 items-center border-b border-[var(--code-border)] px-1">
          <TabsList
            variant="line"
            className="group-data-horizontal/tabs:h-10 gap-0 rounded-none bg-transparent px-1 py-0 text-[var(--code-muted)]"
          >
            <TabsTrigger
              value="preview"
              className="h-10 rounded-none px-2.5 font-mono text-[11px] text-[var(--code-muted)] data-active:text-[var(--code-foreground)] group-data-horizontal/tabs:after:bottom-0"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="h-10 rounded-none px-2.5 font-mono text-[11px] text-[var(--code-muted)] data-active:text-[var(--code-foreground)] group-data-horizontal/tabs:after:bottom-0"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="preview"
          className="m-0 flex min-h-64 items-center justify-center p-8"
        >
          <Demo />
        </TabsContent>

        <TabsContent value="code" className="relative m-0">
          <CopyButton text={source} compact className="absolute right-1.5 top-1.5 z-10" />
          <pre className="m-0! max-h-[32rem]! overflow-auto! bg-transparent! p-4 text-[var(--code-foreground)] sm:p-5 [&::-webkit-scrollbar-thumb]:bg-[var(--code-border)] [&::-webkit-scrollbar-track]:bg-[var(--code-background)] [&::-webkit-scrollbar]:size-2">
            <code
              className="whitespace-pre font-mono text-xs font-normal leading-6 slashed-zero"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
