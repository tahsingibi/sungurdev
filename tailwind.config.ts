import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.scss',
    './components/**/*.scss',
    './containers/**/*.scss',
  ],
  theme: {
    extend: {
      fontSize: {
        mid: ['14px', '22px'],
        headline: ['30px', '38px'],
      },
    },
  },
  plugins: [],
};
export default config;
