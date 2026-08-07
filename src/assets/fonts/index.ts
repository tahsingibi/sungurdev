import localFont from 'next/font/local';

const geistSans = localFont({
  src: './GeistVF.woff',
  variable: '--geist',
  weight: '100 900',
});
const geistMono = localFont({
  src: './GeistMonoVF.woff',
  variable: '--geist-mono',
  weight: '100 900',
});

const inter = localFont({
  src: './InterVariable.woff2',
  variable: '--inter',
  weight: '100 900',
});

const fonts = {
  geistSans,
  geistMono,
  inter,
};

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  inter.variable,
].join(' ');

export { fontVariables, fonts, geistMono, geistSans, inter };
