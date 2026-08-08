'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/src/mdx-components/code/copy-button';
import { cn } from '@/lib/utils';
import { useMemo, useSyncExternalStore } from 'react';
import { toast } from 'sonner';
import { TerminalIcon } from 'lucide-react';

export type PackageManager = 'prompt' | 'pnpm' | 'yarn' | 'npm' | 'bun';

export interface CodeBlockCommandProps {
  prompt?: string;
  pnpm?: string;
  yarn?: string;
  npm?: string;
  bun?: string;
  className?: string;
  onCopySuccess?: (data: { packageManager: PackageManager; command: string }) => void;
  onCopyError?: (error: Error) => void;
}

const storageKey = 'preferred-package-manager';
const storageEvent = 'preferred-package-manager-change';

function subscribeToPackageManager(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(storageEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(storageEvent, callback);
  };
}

export function CodeBlockCommand({
  prompt,
  pnpm,
  yarn,
  npm,
  bun,
  className,
  onCopySuccess,
  onCopyError,
}: CodeBlockCommandProps) {
  const tabs = useMemo(
    () => ({ prompt, pnpm, yarn, npm, bun }),
    [prompt, pnpm, yarn, npm, bun],
  );
  const availableTabs = useMemo(
    () => Object.entries(tabs).filter((entry): entry is [PackageManager, string] => Boolean(entry[1])),
    [tabs],
  );
  const defaultTab = availableTabs[0]?.[0] ?? 'npm';
  const storedPackageManager = useSyncExternalStore(
    subscribeToPackageManager,
    () => window.localStorage.getItem(storageKey) as PackageManager | null,
    () => null,
  );
  const packageManager = availableTabs.some(([key]) => key === storedPackageManager)
    ? storedPackageManager as PackageManager
    : defaultTab;

  const handleValueChange = (value: string) => {
    const nextValue = value as PackageManager;
    window.localStorage.setItem(storageKey, nextValue);
    window.dispatchEvent(new Event(storageEvent));
  };

  const command = tabs[packageManager] ?? tabs[defaultTab] ?? '';

  return (
    <div
      className={cn(
        'relative my-7 overflow-hidden rounded-[10px] border border-[var(--code-border)] bg-[var(--code-background)] text-[var(--code-foreground)] shadow-[0_1px_0_rgb(255_255_255/0.05)_inset]',
        className,
      )}
    >
      <Tabs value={packageManager} onValueChange={handleValueChange} className="gap-0">
        <div className="flex h-10 items-center border-b border-[var(--code-border)] pr-11">
          <TerminalIcon aria-hidden="true" className="ml-3 size-3.5 shrink-0 text-[var(--code-muted)]" />
          <TabsList
            variant="line"
            className="group-data-horizontal/tabs:h-10 max-w-full justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-1 py-0 text-[var(--code-muted)]"
          >
            {availableTabs.map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-10 rounded-none px-2.5 font-mono text-[11px] text-[var(--code-muted)] data-active:text-[var(--code-foreground)] group-data-horizontal/tabs:after:bottom-0"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {availableTabs.map(([key, value]) => (
          <TabsContent key={key} value={key} className="m-0">
            <pre
              data-package-manager={key}
              className="m-0! overflow-x-auto bg-transparent! p-4 font-mono text-xs leading-6 text-[var(--code-foreground)] sm:p-5 data-[package-manager=prompt]:whitespace-pre-wrap"
            >
              <code>
                {key !== 'prompt' && <span className="select-none text-[var(--code-muted)]">$ </span>}
                {value}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>

      <CopyButton
        text={command}
        compact
        className="absolute right-1.5 top-1.5 z-10"
        onCopySuccess={(copiedCommand) => {
          toast.success(`${packageManager} command copied`);
          onCopySuccess?.({ packageManager, command: copiedCommand });
        }}
        onCopyError={(error) => {
          toast.error('Command could not be copied');
          onCopyError?.(error);
        }}
      />
    </div>
  );
}

export function convertNpmCommand(npmCommand: string) {
  if (npmCommand.startsWith('npm install')) {
    return {
      pnpm: npmCommand.replaceAll('npm install', 'pnpm add'),
      yarn: npmCommand.replaceAll('npm install', 'yarn add'),
      npm: npmCommand,
      bun: npmCommand.replaceAll('npm install', 'bun add'),
    };
  }

  if (npmCommand.startsWith('npx create-')) {
    return {
      pnpm: npmCommand.replace('npx create-', 'pnpm create '),
      yarn: npmCommand.replace('npx create-', 'yarn create '),
      npm: npmCommand,
      bun: npmCommand.replace('npx', 'bunx --bun'),
    };
  }

  if (npmCommand.startsWith('npm create')) {
    return {
      pnpm: npmCommand.replace('npm create', 'pnpm create'),
      yarn: npmCommand.replace('npm create', 'yarn create'),
      npm: npmCommand,
      bun: npmCommand.replace('npm create', 'bun create'),
    };
  }

  if (npmCommand.startsWith('npx')) {
    return {
      pnpm: npmCommand.replace('npx', 'pnpm dlx'),
      yarn: npmCommand.replace('npx', 'yarn dlx'),
      npm: npmCommand,
      bun: npmCommand.replace('npx', 'bunx --bun'),
    };
  }

  if (npmCommand.startsWith('npm run')) {
    return {
      pnpm: npmCommand.replace('npm run', 'pnpm'),
      yarn: npmCommand.replace('npm run', 'yarn'),
      npm: npmCommand,
      bun: npmCommand.replace('npm run', 'bun'),
    };
  }

  return { pnpm: npmCommand, yarn: npmCommand, npm: npmCommand, bun: npmCommand };
}
