/**
 * Desteklenen dillerin listesi ve çit etiketi eşlemesi.
 *
 * Ağır vurgulayıcıdan **ayrı** bir dosyada duruyor ve bu bilinçli: bu modül
 * `code-block` tarafından statik import ediliyor. Aynı dosyada olsalardı
 * shiki'nin bütün gramerleri de statik import zincirine girer ve dinamik
 * yüklemenin sağladığı kazanç tamamen kaybolurdu.
 *
 * Burada yalnızca saf veri ve birkaç satırlık bir fonksiyon var.
 */
export const SUPPORTED_LANGUAGES = [
  "javascript",
  "jsx",
  "typescript",
  "tsx",
  "bash",
  "shell",
  "bat",
  "powershell",
  "html",
  "css",
  "json",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Çit etiketini yüklü bir dile çevirir; tanınmayan dilde `null` döner ve kod
 * bloğu düz metin olarak gösterilir.
 */
export function toLanguage(language?: string): SupportedLanguage | null {
  if (!language) return null;
  const value = language.toLowerCase();
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
    ? (value as SupportedLanguage)
    : null;
}
