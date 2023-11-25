import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/**/*.{js,ts,jsx,tsx,mdx,scss}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.scss',
    './container/**/*.{js,ts,jsx,tsx,scss}',
  ],
  theme: {
    extend: {
      fontSize: {
        mid: ['14px', '22px'],
        headline: ['30px', '38px'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
