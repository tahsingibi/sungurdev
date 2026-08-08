import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  icon: string;
}

const paths: Record<string, ReactNode> = {
  'arrow-left-line': <path d="m15 18-6-6 6-6M9 12h10" />,
  'arrow-down-s-line': <path d="m7 10 5 5 5-5" />,
  'arrow-up-short-line': <path d="m7 17 10-10m-7 0h7v7" />,
  'arrow-up-short': <path d="m7 17 10-10m-7 0h7v7" />,
  'download': <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />,
  'file-copy-line': <><rect x="8" y="8" width="11" height="12" rx="1" /><path d="M16 8V5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" /></>,
  'clipboard-line': <><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5V3h6v2M9 10h6m-6 4h6" /></>,
  'check-line': <path d="m5 12 4 4L19 6" />,
  'share-2-line': <><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5m-8 7 8 5" /></>,
  'link': <><path d="m10 13 4-4" /><path d="M7.5 16.5 5 19a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M16.5 7.5 19 5a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0" transform="translate(-1)" /></>,
  'more-line': <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  'github-line': <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.7a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.88c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor" stroke="none" />,
  'linkedin-line': <><rect x="4" y="9" width="4" height="11" fill="currentColor" stroke="none" /><circle cx="6" cy="5" r="2" fill="currentColor" stroke="none" /><path d="M11 20V9h4v1.7c.8-1.2 2-2 3.7-2 3 0 4.3 2 4.3 5.3v6h-4v-5.3c0-1.6-.6-2.6-1.9-2.6-1.5 0-2.1 1-2.1 3V20Z" fill="currentColor" stroke="none" transform="translate(-1)" /></>,
  'twitter-x-line': <path d="M5 4h4l3.5 5L17 4h2l-5.5 6.5L20 20h-4l-4-5.8L7 20H5l6-7.2Z" fill="currentColor" stroke="none" />,
  'mail-line': <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  'markdown-line': <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M5 15V9l3 3 3-3v6m3-3h4m-2-2v5" /></>,
  'openai-line': <><circle cx="12" cy="12" r="8" /><path d="m8 9 4-2 4 2v6l-4 2-4-2Z" /></>,
  'sparkling-2-line': <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Z" /><path d="m18 14 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7Z" /></>,
  'cursor-line': <path d="m5 3 13 9-6 1-3 6Z" />,
};

const fallback = <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6m-6 4h6m-6 4h4" /></>;

export function Icon({ icon, className = '', ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block size-[1em] shrink-0 align-[-0.125em] ${className}`}
      {...props}
    >
      {paths[icon] ?? fallback}
    </svg>
  );
}
