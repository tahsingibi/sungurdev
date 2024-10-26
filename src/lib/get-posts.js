import fs from 'node:fs';
import path from 'node:path';
import { format } from 'date-fns';

async function getAllPosts() {
  const dir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(dir);

  const posts = files
    .filter(
      (filename) => filename.endsWith('.mdx') && !filename.startsWith('.')
    )
    .map((filename) => {
      const name = filename?.replace('.mdx', '');
      try {
        const { metadata } = require(`@/content/blogs/${filename}`);
        const formattedDate = format(
          new Date(metadata?.publishDate),
          'MMMM dd, yyyy'
        );

        return {
          slug: name,
          metadata: { ...metadata, date: formattedDate } || {
            title: 'Untitled',
            publishDate: '1970-01-01',
          },
        };
      } catch (error) {
        console.error(`Error loading metadata for file ${filename}:`, error);
        return {
          slug: name,
          metadata: { title: 'Untitled', publishDate: '1970-01-01' },
        };
      }
    });

  // Sort posts by publishDate in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.publishDate).getTime() -
      new Date(a.metadata.publishDate).getTime()
  );

  return posts;
}

const posts = await getAllPosts();

export default posts;

export async function getPost({ slug }) {
  try {
    const mdxPath = path.join('content', 'blogs', `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);
    const formattedDate = format(
      new Date(metadata?.publishDate),
      'MMMM dd, yyyy'
    );
    return {
      slug,
      metadata: { ...metadata, date: formattedDate },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}
