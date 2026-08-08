import settings from '@/src/settings';

interface OpenGraphProps {
  title?: string | null;
  subtitle?: string | null;
}

export default function OpenGraph({ title, subtitle }: OpenGraphProps = {}) {
  const { name: defaultTitle, title: defaultSubtitle, url } = settings;

  const data = {
    title: title || defaultTitle,
    subtitle: subtitle || defaultSubtitle,
    url: url.split('//')[1],
  };

  const urlRender = data.url?.replace('http://', '').replace('https://', '')?.split('/');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        color: '#f4f4f5',
        backgroundColor: '#09090b',
        backgroundImage: `
            linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px)
          `,
        backgroundSize: '48px 48px',
        padding: '72px',
        border: '1px solid #3f3f46',
      }}
    >
      <div style={{ display: 'flex', fontSize: 20, color: '#71717a', letterSpacing: 5 }}>
        TS/01 · FIG_OG
      </div>
      <h2
        style={{
          fontSize: '72px',
          lineHeight: 1.05,
          marginBottom: '12px',
          letterSpacing: '-3px',
          maxWidth: '1000px',
        }}
      >
        {data.title}
      </h2>
      <h5 style={{ fontSize: '28px', color: '#a1a1aa', marginBottom: 'auto' }}>
        {title && 'in '}
        {data.subtitle}
        {subtitle && ' - by ' + defaultTitle}
      </h5>

      <p
        style={{
          fontSize: '20px',
          padding: '12px 16px',
          color: '#a1a1aa',
          background: '#18181b',
          border: '1px solid #3f3f46',
        }}
      >
        {urlRender}
      </p>
    </div>
  );
}
