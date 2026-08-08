import BlogActions from '@/src/components/blog-actions';
import Featured from '@/src/components/featured';
import SectionSeparator from '@/src/components/section-separator';
import { getPostsStore } from '@/src/lib/store/posts-store';
import settings from '@/src/settings';
import NotFound from '../../not-found';
import BackButton from './back-button';

interface WriteDetailViewProps {
  params: Promise<{ slug: string }>;
}

export default async function WriteDetailView({ params }: WriteDetailViewProps) {
  const { slug } = await params;
  const { findBySlug } = await getPostsStore();
  const post = findBySlug(slug);
  if (post) {
    const { default: MDXContent } = await import(`@/content/blogs/${slug}.mdx`);
    const { category, date, description, featured, publishDate, title } = post.metadata;
    const baseUrl = settings.url.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}/write/${slug}`;
    const markdownUrl = `${canonicalUrl}/markdown`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      datePublished: new Date(publishDate).toISOString(),
      dateModified: new Date(publishDate).toISOString(),
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Person',
        name: settings.name,
        url: baseUrl,
      },
      ...(featured?.type === 'image' ? { image: new URL(featured.src, `${baseUrl}/`).toString() } : {}),
    };

    return (
      <div className="flex w-full max-w-full! flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <header>
          <div className="flex min-h-12 items-center justify-between gap-3 pl-4 sm:pl-6">
            <BackButton />
            <BlogActions
              title={title}
              canonicalUrl={canonicalUrl}
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/tahsingibi/sungurdev/blob/main/content/blogs/${slug}.mdx`}
            />
          </div>
          <div className="relative h-5 border-y border-border before:absolute before:inset-0 before:bg-[repeating-linear-gradient(135deg,transparent_0,transparent_7px,var(--hatch-line)_7px,var(--hatch-line)_8px)]" />
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Journal entry</p>
            <h1 className="max-w-2xl text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
            <span className="inline-flex gap-2 items-center">
              {category && (
                <span className="w-fit border border-border px-2 py-px text-[10px] uppercase tracking-wider text-muted-foreground">
                  {category}
                </span>
              )}
              {date}
            </span>
            </p>
          </div>
        </header>
        {featured ? <Featured {...featured} /> : <SectionSeparator />}
        <article className="max-w-full grow px-6 py-10 sm:px-10 sm:py-14">
          <MDXContent />
        </article>
        <SectionSeparator />
      </div>
    );
  }

  return <NotFound />;
}
