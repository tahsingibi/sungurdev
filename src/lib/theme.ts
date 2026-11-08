/** Colors extracted from https://kamran.fyi/ (2026-11-08).
 * CSS keeps the source OKLCH values. The matching sRGB values support
 * OpenGraph/Satori and syntax highlighting, which require hex colors.
 */
const color = (css: string, hex = css) => ({ css, hex });
const neutral = {
  white: color("#ffffff"),
  50: color("#fafafa"),
  100: color("#f5f5f5"),
  200: color("#e5e5e5"),
  300: color("#d4d4d4"),
  400: color("#a3a3a3"),
  500: color("#737373"),
  600: color("#525252"),
  700: color("#404040"),
  800: color("#262626"),
  900: color("#171717"),
};
const stone = {
  100: color("oklch(.955 .016 72)", "#f6eee5"),
  200: color("oklch(.87 .02 68)", "#dcd2c6"),
  300: color("oklch(.78 .026 64)", "#c4b4a7"),
  400: color("oklch(.685 .032 60)", "#a89786"),
  500: color("oklch(.58 .038 56)", "#8d7564"),
  600: color("oklch(.45 .03 52)", "#625147"),
  700: color("oklch(.34 .024 50)", "#43342d"),
  800: color("oklch(.275 .022 48)", "#30251f"),
  900: color("oklch(.2 .018 46)", "#1c150f"),
  950: color("oklch(.145 .012 44)", "#0f0807"),
  hover: color("oklch(.235 .02 47)", "#261b16"),
};
const themes = {
  light: {
    background: neutral.white,
    foreground: neutral[900],
    "body-foreground": neutral[800],
    "copy-foreground": neutral[700],
    "muted-foreground": neutral[500],
    "subtle-foreground": neutral[400],
    card: neutral[50],
    "card-hover": neutral[100],
    border: neutral[200],
    "hover-border": neutral[300],
    line: color("#ededed"),
    decoration: neutral[300],
    success: color("#047857"),
    warning: color("#b45309"),
    "selection-background": color("#111111"),
    "selection-foreground": neutral.white,
  },
  dark: {
    background: stone[950],
    foreground: stone[100],
    "body-foreground": stone[200],
    "copy-foreground": stone[300],
    "muted-foreground": stone[400],
    "subtle-foreground": stone[500],
    card: stone[900],
    "card-hover": stone.hover,
    border: stone[800],
    "hover-border": stone[700],
    line: stone[800],
    decoration: stone[600],
    success: color("#6ee7b7"),
    warning: color("#fcd34d"),
    "selection-background": color("#f7efe5"),
    "selection-foreground": color("#1d140f"),
  },
};

type ThemeName = keyof typeof themes;
type ThemeToken = keyof typeof themes.light;
const resolveColors = (mode: ThemeName, format: "css" | "hex") =>
  Object.fromEntries(Object.entries(themes[mode]).map(([token, value]) => [token, value[format]])) as Record<ThemeToken, string>;

export const themeColors = { light: resolveColors("light", "css"), dark: resolveColors("dark", "css") };
export const themeSrgb = { light: resolveColors("light", "hex"), dark: resolveColors("dark", "hex") };

const aliases = {
  "card-foreground": "var(--foreground)",
  popover: "var(--card)",
  "popover-foreground": "var(--foreground)",
  muted: "var(--card)",
  accent: "var(--card-hover)",
  "accent-foreground": "var(--foreground)",
  secondary: "var(--card)",
  "secondary-foreground": "var(--copy-foreground)",
  primary: "var(--foreground)",
  "primary-foreground": "var(--background)",
  input: "var(--border)",
  ring: "var(--hover-border)",
  destructive: "var(--warning)",
  "chart-1": "var(--foreground)",
  "chart-2": "var(--copy-foreground)",
  "chart-3": "var(--muted-foreground)",
  "chart-4": "var(--subtle-foreground)",
  "chart-5": "var(--border)",
  sidebar: "var(--card)",
  "sidebar-foreground": "var(--foreground)",
  "sidebar-primary": "var(--primary)",
  "sidebar-primary-foreground": "var(--primary-foreground)",
  "sidebar-accent": "var(--accent)",
  "sidebar-accent-foreground": "var(--accent-foreground)",
  "sidebar-border": "var(--border)",
  "sidebar-ring": "var(--ring)",
  "banner-glow": "transparent",
  "overlay-background": "color-mix(in srgb, oklch(.145 .012 44) 92%, transparent)",
  "overlay-foreground": stone[100].css,
  "overlay-hover": stone.hover.css,
};
const declarations = (values: Record<string, string>) => Object.entries(values).map(([key, value]) => `--${key}:${value}`).join(";");
export const themeStyles = `:root{${declarations({ ...themeColors.light, ...aliases })}}.dark{${declarations(themeColors.dark)}}`;
