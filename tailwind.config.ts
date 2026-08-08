import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/view/**/*.{js,ts,jsx,tsx,mdx}',
    './src/mdx-components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        hover: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'var(--muted-foreground)',
            '--tw-prose-body': 'var(--muted-foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': 'var(--muted-foreground)',
            '--tw-prose-links': 'var(--foreground)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-bullets': 'var(--muted-foreground)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-code': 'var(--foreground)',
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
      animation: {
        shine: 'shine 0.85s ease-in-out',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '490px',
          padding: '0px 16px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    }),
    typography,
  ],
};

export default config;
