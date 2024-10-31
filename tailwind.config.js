const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/view/**/*.{js,ts,jsx,tsx,mdx}',
    './src/mdx-components/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.zinc[400]'),
            '--tw-prose-body': theme('colors.zinc[400]'),
            '--tw-prose-headings': theme('colors.zinc[100]'),
            '--tw-prose-lead': theme('colors.zinc[400]'),
            '--tw-prose-links': theme('colors.zinc[300]'),
            '--tw-prose-bold': theme('colors.zinc[200]'),
            '--tw-prose-bullets': theme('colors.zinc[200]'),
            '--tw-prose-hr': theme('colors.zinc[200]'),
            '--tw-prose-code': theme('colors.zinc[200]'),
            // '--tw-prose-pre-code': theme('colors.red[600]'),
            // '--tw-prose-pre-bg': theme('colors.zinc[900]'),
            // '--tw-prose-quotes': theme('colors.zinc[200]'),
            // '--tw-prose-quote-borders': theme('colors.zinc[300]'),
            // '--tw-prose-captions': theme('colors.zinc[700]'),
            // '--tw-prose-th-borders': theme('colors.zinc[300]'),
            // '--tw-prose-td-borders': theme('colors.zinc[200]'),
            // '--tw-prose-invert-body': theme('colors.zinc[200]'),
            // '--tw-prose-invert-headings': theme('colors.white'),
            // '--tw-prose-invert-lead': theme('colors.zinc[300]'),
            // '--tw-prose-invert-links': theme('colors.white'),
            // '--tw-prose-invert-bold': theme('colors.white'),
            // '--tw-prose-invert-counters': theme('colors.zinc[400]'),
            // '--tw-prose-invert-bullets': theme('colors.zinc[600]'),
            // '--tw-prose-invert-hr': theme('colors.zinc[700]'),
            // '--tw-prose-invert-quotes': theme('colors.zinc[100]'),
            // '--tw-prose-invert-quote-borders': theme('colors.zinc[700]'),
            // '--tw-prose-invert-captions': theme('colors.zinc[400]'),
            // '--tw-prose-invert-code': theme('colors.white'),
            // '--tw-prose-invert-pre-code': theme('colors.zinc[300]'),
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            // '--tw-prose-invert-th-borders': theme('colors.zinc[600]'),
            // '--tw-prose-invert-td-borders': theme('colors.zinc[700]'),
          },
        },
      }),
      fontFamily: {
        sans: 'var(--inter)',
        mono: 'var(--geist-mono)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '560px',
          padding: '0px 16px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    }),
    require('@tailwindcss/typography'),
  ],
};
