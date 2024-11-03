import db from '@/db';
import { defaultPath } from '@/src/metadata';

export const fontURL = `${defaultPath}/doc/font/dm.otf`;

export default function OpenGraph({ title, subtitle }) {
  const { name: defaultTitle, title: defaultSubtitle, url } = db;

  const _title = title || defaultTitle;
  const _subtitle = subtitle || defaultSubtitle;
  const _url = url.split('//')[1];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        color: 'black',
        backgroundColor: 'white',
        backgroundImage: `
            linear-gradient(to right, #10101010 1px, transparent 1px),
            linear-gradient(to bottom, #10101010 1px, transparent 1px)
          `,
        backgroundSize: '32px 32px',
        padding: '60px',
        borderTop: '20px solid black',
      }}
    >
      <h2
        style={{
          fontSize: '80px',
          marginBottom: '-20px',
          letterSpacing: '-4px',
        }}
      >
        {_title}
      </h2>
      <h5 style={{ fontSize: '32px', marginBottom: 'auto' }}>{_subtitle}</h5>

      <p
        style={{
          fontSize: '20px',
          borderRadius: '9999px',
          padding: '12px 20px',
          color: 'white',
          background: 'black',
          marginLeft: 4,
        }}
      >
        {_url}
      </p>
    </div>
  );
}
