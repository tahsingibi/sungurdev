"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const COOKIE_NAME = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const THEME_EVENT = "sungur-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function getTheme(): Theme {
  if (typeof document === "undefined") return "system";

  try {
    const storedTheme = readCookie(COOKIE_NAME);
    return isTheme(storedTheme) ? storedTheme : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme;
  if (typeof window === "undefined") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
}

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DARK_QUERY);
  const syncTheme = () => {
    applyTheme(getTheme());
    onStoreChange();
  };

  window.addEventListener(THEME_EVENT, syncTheme);
  mediaQuery.addEventListener("change", syncTheme);

  return () => {
    window.removeEventListener(THEME_EVENT, syncTheme);
    mediaQuery.removeEventListener("change", syncTheme);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    getTheme,
    () => "system",
  );
  const resolvedTheme = useSyncExternalStore<ResolvedTheme>(
    subscribe,
    () => resolveTheme(getTheme()),
    () => "light",
  );

  // React Strict Mode can restore the server-authored html class in development.
  useLayoutEffect(() => {
    applyTheme(getTheme());
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    try {
      writeCookie(COOKIE_NAME, nextTheme);
    } catch {
      // Theme switching still works when cookies are unavailable.
    }

    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
