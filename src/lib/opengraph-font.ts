import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function getOpenGraphFont(): Promise<ArrayBuffer> {
  const font = await readFile(
    path.join(process.cwd(), 'public', 'doc', 'font', 'dm.otf')
  );

  return font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength
  ) as ArrayBuffer;
}
