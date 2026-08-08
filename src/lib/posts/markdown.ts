import fs from 'node:fs/promises';
import path from 'node:path';

export async function getPostMarkdown(slug: string) {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;

  try {
    const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf8');

    return source
      .replace(/^export const metadata\s*=\s*\{[\s\S]*?\n\};\s*/m, '')
      .trim();
  } catch {
    return null;
  }
}
