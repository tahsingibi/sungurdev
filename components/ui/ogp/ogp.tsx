export default function OpenGraph({ title, category }: Readonly<{ title?: string, category?: string }>) {

    const _category = category ? `▪ ${category}` : 'by @tahsingibi'

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                fontSize: 32,
                fontWeight: 900,
                backgroundImage:
                    'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                borderTop: "20px solid black",
                padding: 40
            }}
        >
            <div></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', gap: 20 }}>
                <div style={{ fontSize: 52, textAlign: 'center' }}>{title}</div>
                <div style={{ fontSize: 30, textAlign: 'center', opacity: 0.5 }}>{_category}</div>

            </div>
            <div style={{ display: 'flex', marginTop: 'auto', fontSize: 20, background: 'black', color: 'white', padding: '8px 32px', borderRadius: 9999 }}>
                <div style={{ fontWeight: 900 }}>sungur</div>
                .dev
            </div>
        </div>

    )
}
