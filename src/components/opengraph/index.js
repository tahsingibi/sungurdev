export default function OpenGraph({
  title = 'Tahsin SUNGUR',
  subtitle = 'Frontend Developer',
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        color: 'white',
        backgroundColor: 'black',
        backgroundImage: `
            linear-gradient(to right, #101010 1px, transparent 1px),
            linear-gradient(to bottom, #101010 1px, transparent 1px)
          `,
        backgroundSize: '40px 40px',
        padding: '60px',
      }}
    >
      <h2
        style={{ fontSize: '80px', marginTop: 'auto', marginBottom: '-20px' }}
      >
        {title}
      </h2>
      <h5 style={{ fontSize: '32px', marginBottom: 'auto' }}>{subtitle}</h5>

      <p
        style={{
          fontSize: '20px',
          background: 'white',
          borderRadius: '9999px',
          padding: '4px 12px',
          color: 'black',
        }}
      >
        sungur.dev
      </p>
    </div>
  );
}
