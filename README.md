# sungur.dev

Next.js tabanlı kişisel portfolyo ve blog.

## İçerikleri düzenleme

Siteye ait ortak içeriklerin ana kaynağı **`src/lib/settings.ts`** dosyasıdır:

- **Kimlik ve bağlantılar:** isim, ünvan, sosyal hesaplar, navigasyon, özgeçmiş ve SEO.
- **`images` / `gallery`:** görsel yolları, açıklamaları ve galerideki sıralama. Profil ve SEO görseli de aynı kaydı kullanır.
- **`projects`:** her projenin adı, açıklaması, teknolojileri, logosu ve bağlantıları yalnızca burada tanımlanır. Ana sayfa, deneyim sayfası ve komut paleti bu kayıtları kullanır. `logo.src` yerel görseli, `logo.monochrome` tek renkli SVG maskesini belirtir; logosu olmayan projeler `icon` alanını kullanır.
- **`experience`:** çalışma dönemleri ve açıklamalar. Projeleri yeniden tanımlamak yerine katalogdaki kayıtlara referans verilir.
- **`home`:** bölüm başlıkları, tanıtım metinleri, ana sayfada gösterilecek proje kimlikleri ve yazı sayısı.
- **`pages`:** liste sayfalarının başlık ve açıklamaları.

Blog yazıları **`content/blogs/*.mdx`** altında tutulur. Her yazının başlığı, tarihi, kategorisi ve açıklaması kendi `metadata` tanımından okunur; listelere ayrıca kayıt eklenmez. HTML, Markdown çıktısı, RSS ve site haritası aynı yazı kaynağını kullanır.

Galeri görselleri ve proje logoları **`public/images`** içindedir. Galeri dosyaları WebP, uygulama ikonları 128 px WebP formatındadır. Hâl için tek siyah SVG kullanılır ve CSS maskesiyle her iki temaya uyarlanır. ADBroom'un saydam dış boşluğu ve Kurye 35'in 12 px siyah kenarı yerel dosyalardan kırpılmıştır. Dosyaları değiştirirken `settings.ts` içindeki ilgili yolu ve açıklamayı güncelleyin. Kaynak görsellerin arşivini yayınlanan `public` klasörünün dışında tutun.

## Renk paleti

Tüm arayüz renkleri **`src/lib/theme.ts`** üzerinden yönetilir. Açık ve koyu tema değerleri `kamran.fyi` stil dosyalarından alınmıştır. Web arayüzü kaynak OKLCH değerlerini, OpenGraph kartları ve kod vurgulayıcıları aynı renklerin sRGB karşılıklarını kullanır. Tema tanımları başka CSS dosyalarında tekrar edilmez.

## Geliştirme ve doğrulama

```bash
yarn dev
yarn test:content
yarn test:og # çalışan geliştirme sunucusunu denetler
yarn build
yarn test:og --build # production çıktısını denetler
```

İçerik kontrolü; proje referanslarını, navigasyonu, görsel yollarını ve kullanılmayan görselleri denetler.

## OpenGraph

Ana kart `src/app/opengraph-image.tsx`, yazı kartları `src/app/write/[slug]/opengraph-image.tsx` ile Next.js'in dosya tabanlı metadata sisteminde üretilir. Ortak renderer `src/lib/opengraph.ts`, `next/og` kullanır. Next 16.3'te `next/image` ile paylaşılan Sharp ayarı SVG tamponlarını kapattığı için yalnızca geliştirme ortamında dar bir uyumluluk düzeltmesi uygulanır; SVG görsellerini optimize etme seçeneği açılmaz. Bu geliştirme kodu production paketinden çıkarılır. Cloudflare'da OpenNext, OG renderer'ını Worker uyumlu WASM sürümüne dönüştürür; native Sharp uygulama koduna eklenmez.

`test:og`, önce görsel optimizasyonunu çalıştırıp ardından sayfaların OG/Twitter etiketlerini ve tüm PNG içeriklerini doğrular. Böylece yalnızca build sırasında görünmeyen bu çalışma sırası hatası da kontrol edilir.

## Cloudflare Workers Builds

Dashboard'da build komutunu `yarn build:cloudflare`, deploy komutunu `yarn deploy:cloudflare` olarak ayarlayın. İlk komut Next.js çıktısını üretip OpenNext ile Worker paketine dönüştürür; ikinci komut hazırlanan paketi yayınlar. Böylece Next.js build'i iki kez çalıştırılmaz.

Yerelden tek komutla build ve yayın için mevcut `yarn deploy` kullanılabilir. Yalnızca paketin hazırlanmasını doğrulamak için `yarn build:cloudflare` çalıştırın; bu komut yayın yapmaz.
