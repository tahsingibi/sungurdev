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

const fonts = {
  geistSans,
  geistMono,
};

const fontVariables = [geistSans.variable, geistMono.variable].join(' ');

export { geistSans, geistMono, fonts, fontVariables };
