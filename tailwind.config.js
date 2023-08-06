/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**.*',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'paragraph',
    }),
  ],
};
