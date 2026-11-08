/**
 * Sözdizimi vurgulayıcı — yalnızca gerçekten kullanılan diller.
 *
 * Eskiden `shiki/bundle/full` import ediliyordu: ~300 dil ve onlarca tema,
 * hepsi sunucu paketine giriyordu. Cloudflare Workers'ın 3 MiB'lık paket
 * sınırı buna dayanmadı ve deploy reddedildi.
 *
 * Burada iki şey değişti:
 *
 *   1. Yalnızca yazılarda geçen diller yükleniyor (js/ts/jsx/tsx/bash/bat ve
 *      birkaç yaygın olan). Yeni bir dil gerekirse listeye bir satır eklenir.
 *   2. Regex motoru olarak JavaScript motoru kullanılıyor, Oniguruma değil —
 *      ikincisi ayrıca bir WASM ikilisi taşıyor ve bu gramerler için gerekmiyor.
 *
 * Bu modül `code-block` tarafından **dinamik** import ediliyor: vurgulama
 * yalnızca tarayıcıda, bir efektin içinde çalışıyor. Statik import edilseydi
 * sunucu paketine de girer, orada hiç çalışmayacak bir kod için yer kaplardı.
 */
import type { SupportedLanguage } from "@/lib/highlighter-langs";
import { themeSrgb } from "@/lib/theme";
import type { ThemeRegistration } from "shiki";
import bash from "@shikijs/langs/bash";
import bat from "@shikijs/langs/bat";
import css from "@shikijs/langs/css";
import html from "@shikijs/langs/html";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import powershell from "@shikijs/langs/powershell";
import typescript from "@shikijs/langs/typescript";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

/** Vurgulayıcı bir kez kuruluyor; her kod bloğu için yeniden kurmak pahalı. */
let highlighterPromise: Promise<HighlighterCore> | null = null;

function codeTheme(mode: "light" | "dark"): ThemeRegistration {
  const colors = themeSrgb[mode];
  return {
    name: `sungur-${mode}`,
    type: mode,
    colors: {
      "editor.background": colors.background,
      "editor.foreground": colors["body-foreground"],
    },
    tokenColors: [
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: colors["muted-foreground"] } },
      { scope: ["keyword", "storage", "constant.language"], settings: { foreground: colors.foreground, fontStyle: "bold" } },
      { scope: ["string", "constant.numeric", "constant.character"], settings: { foreground: colors["copy-foreground"] } },
      { scope: ["entity.name", "support.function"], settings: { foreground: colors.foreground } },
      { scope: ["punctuation", "meta.brace"], settings: { foreground: colors["muted-foreground"] } },
    ],
  };
}

function getHighlighter() {
  highlighterPromise ??= createHighlighterCore({
    themes: [codeTheme("light"), codeTheme("dark")],
    // jsx/tsx, javascript/typescript gramerlerinin içinden geliyor.
    langs: [javascript, typescript, bash, bat, powershell, html, css, json],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighterPromise;
}

export async function highlight(code: string, lang: SupportedLanguage) {
  const highlighter = await getHighlighter();

  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "sungur-light", dark: "sungur-dark" },
    defaultColor: false,
    structure: "inline",
  });
}
