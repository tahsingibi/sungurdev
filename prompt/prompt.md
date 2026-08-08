# Görev: Next.js Projesinde UI/UX Design

## Amaç

Mevcut Next.js projesinin UI/UX tasarımını sıfırdan yenile. Tasarımı temel alınacak web sitesi: https://chanhdai.com

Bu sitelerdeki grid/çizgi tabanlı (grid-lined), minimal ve tipografi odaklı
arayüz yaklaşımını temel al. [Ekran görüntüleri: prompt dizininde mevcut olacak.]

## Kapsam — Neyi Değiştirebilirsin

- Tüm sayfa componentlerini, layout dosyalarını, stil dosyalarını (CSS/Tailwind
  config vb.) ve route yapısını tamamen yeniden yazabilirsin.
- Yeni bir component mimarisi kurabilirsin.
- Sistemde şu an `shadcn/ui` component mimarisi temel alınıyor. Hazırlanacak componentlerde `shadcn/ui`'a ait componentleri kullanarak yeni componentler üretebilir, varolan componentler üzerinde düzenlemeler yapabilirsin.

## Kapsam — Neye DOKUNMAYACAKSIN

- `settings.ts` dosyasındaki veri yapısı ve içerikler SABİT kalacak.
  (Gerekirse yeni alanlar ekleyebilirsin ama mevcut alanları kırma.)
- `content/` klasöründeki blog yazıları (markdown/mdx içerikleri) SABİT kalacak,
  taşınmayacak veya içerik olarak değiştirilmeyecek.


Sitenin tamamı (ana sayfa dahil TÜM sayfalar) bu referansın görsel dilini
(tipografi, spacing, minimal renk paleti, border/seperatör mantığı) tutarlı
şekilde yansıtmalı. Başka hiçbir siteden görsel/yapısal esinlenme
kullanılmayacak.

## Teknik Gereksinimler

### 1. Layout Sistemi

- Tüm sayfa layout'u dikey (vertical) akışla kurulmalı. 
- Tek bir ana layout component'i olacak, fakat config üzerinden 3 moda
  destek verecek:
  - `default`
  - `wide`
  - `custom`
- Her sayfa/route, layout config'i üzerinden kendi `className`'ini
  tanımlayabilmeli (örn. `layout: { type: "wide", className: "..." }`).
- Bu config, `settings.ts` içine eklenebilir veya ayrı bir `layout.config.ts`
  dosyasında tutulabilir — sana bırakıyorum, en temiz çözümü öner.
- Sayfalara özel footer/header show/hide, default, wide, custom size gibi özellikler eklenmeli.

### 2. Tema (Light/Dark Mode)

- Sistem tercihine duyarlı + manuel toggle destekli light/dark mode.
- Tema geçişinde flash-of-unstyled-content (FOUC) olmayacak şekilde kur.
- Primary renk belirle. Hover, active, focus, primary vs gibi durumlarda variantları ile birlikte kullanabilelim.
- Sisteme baştan dark/light mode desteği kur:
- Sistem tercihine (`prefers-color-scheme`) duyarlı olacak.
- Kullanıcının manuel toggle ile değiştirebileceği bir kontrol olacak.
- Tema geçişinde flash-of-unstyled-content (FOUC) yaşanmayacak şekilde kur
  (örn. tema tercihini ilk render öncesi inline script ile uygulayarak).
- Kullanıcının seçimi kalıcı olarak saklanmalı (örn. localStorage).
- Referans sitedeki (chanhdai.com) light/dark görsel diline sadık kal.

### 3. Görsel Dil

- Grid/çizgili (grid-lined) bir arayüz: belirgin grid çizgileri, düzenli
  spacing, tipografi vurgulu, minimal renk paleti.
- Referans sitelerdeki yapıyı birebir kopyalama, ilhan al ve projenin
  içeriğine uyarla.

#### 3a. Border Sistemi
Referans sitedeki mantığı baştan uygula:
- Sayfayı saran TEK bir "main border" (dış çerçeve) olacak.
- Bu çerçeve içinde hiçbir content bloğunun kendine ait full/kapalı
  border'ı olmayacak — yani iç içe border katmanları KURMA.
- Border'lar yalnızca seperatör (ayırıcı çizgi) amacıyla kullanılacak.
- Ana başlık alanlarına (örn. "Deneyim", "Seçili İşler", "Son Notlar") ait
  yatay çizgiler, content alanının sınırlarını aşıp main border'a kadar
  kesintisiz devam edecek şekilde kurulmalı.

Bu davranış TÜM sayfalarda tutarlı olmalı.

#### 3b. Section Arası Seperatör
Ana section'lar (örn. "Deneyim" → "Son Notlar") arasında geçiş net
algılanmalı. Referans sitedeki gibi yatay çizgili (hatched/dashed
görünümlü) belirgin bir seperatör tasarla. shadcn'in "Separator"
component'ini bunun için değerlendir.

#### 3c. Footer
Footer, referans sitedeki yapıya uygun olarak hem x hem y ekseninde border'a
sahip olacak şekilde tasarlanmalı; footer içerikten sadece boşlukla değil,
görsel olarak da net ayrışmalı.

### 4. Blog Yazılarında Metin Renkleri
Blog içeriği (prose alanı) için başlıklar, paragraf, link, blockquote,
liste, inline code gibi tüm text stillerini baştan tasarla. Renkler hem
light hem dark modda okunabilir, kontrastı yeterli ve referans sitenin
tipografi/renk diliyle uyumlu olacak şekilde kurulmalı.

### 5. Blog Yazısı İçi Kod Blokları
Blog içeriğindeki (MDX) kod bloklarını, prompt dizininde verilen
`code-block-command.mdx` component'indeki yaklaşıma göre kur:
- Paket yöneticisi / farklı sekme geçişleri gerektiren durumlar için aynı
  tab yapısı ve etkileşim mantığını (aktif sekme göstergesi, kopyalama
  butonu, kopyalama başarı/hata animasyonu) temel al.
- Component'i birebir kopyalama; projenin genel tasarımına (renk paleti,
  border stili, tipografi, spacing) ve dark/light tema sistemine uyacak
  şekilde özelleştirerek baştan kur.
- Sade, tab gerektirmeyen tekil kod blokları için de aynı görsel dili
  (üst bar, dil etiketi, kopyala butonu) tutarlı şekilde uygula.

### 6. Blog RSS Feed
Blog yazıları için bir RSS feed kur (örn. `/rss.xml` veya `/feed.xml`
route'u üzerinden, App Router route handler ile). Feed:
- `content/` klasöründeki yazılardan otomatik üretilmeli.
- Başlık, açıklama, yayın tarihi, link ve (varsa) yazar bilgisini içermeli.
- Sitenin `<head>` kısmına ilgili `<link rel="alternate" type="application/rss+xml">`
  etiketi eklenmeli ki feed keşfedilebilir olsun.

### 7. Blog Yazısı — Paylaşım Özellikleri

#### 7a. "Share" Menüsü
shadcn'in Dropdown Menu component'ini kullanarak aşağıdaki seçenekleri
çalışır şekilde kur:
- Copy link (panoya kopyalama, kullanıcıya toast/feedback ile bildirim —
  shadcn Toast kullanılabilir)
- Share on X
- Share on LinkedIn
- Other app → cihazın native Web Share API'ını tetikleyecek
  (`navigator.share`, desteklenmiyorsa fallback davranışı tanımla)

#### 7b. "Copy Page" Menüsü
Yine shadcn'in Dropdown Menu component'ini kullanarak aşağıdaki
seçeneklerin TÜMÜNÜ çalışır şekilde kur:
- View as Markdown (yazının markdown çıktısını gösteren/indiren bir görünüm)
- Open in GitHub
- Open in ChatGPT
- Open in Claude
- Open in Cursor
- Open in Grok

Her bir "Open in X" seçeneği için hedef URL şemasını/parametrelerini
araştır (gerekiyorsa ilgili aracın destekli URL formatını kullan) ve
gerçekten o araca yazı içeriğiyle birlikte yönlendiren, çalışan bir link
üret. Placeholder/sahte link kabul edilmeyecek.

## 8. Code Block Component (UI, prompt/install örnekleri için)
Kod blokları için şu component'i referans al:
https://chanhdai.com/components/code-block-command
Birebir kopyalama, projenin genel tasarımına (renk paleti, border stili,
tipografi) ve dark/light tema sistemine uyacak şekilde özelleştirerek kur. Bu componente ait .md dosyası da prompt dizininde yer alacak.
(Bkz. madde 8 — blog içeriğindeki kod blokları için de aynı temel
kullanılacak.)

## 9. CSS Yazım Önceliği
1. Öncelik: component içine doğrudan `className` ile Tailwind class'ları vermek.
2. `className` yetmediğinde: `globals.css` içinde `@apply` ile Tailwind
   class'larını kullanan bir stil bloğu oluştur.
3. `@apply` ile de karşılanamayan (custom/karmaşık) durumlarda: düz CSS yaz.

Ayrı, soyut isimlendirilmiş `.styleClassName` gibi yardımcı class'lar
oluşturma; stil component'e özel ve mümkün olduğunca yerinde (inline
className) tanımlanmalı.

## 10. Kullanılabilir Component Kütüphanesi (shadcn/ui)
Aşağıdaki liste **shadcn/ui component'lerine** aittir. Sistemi kurarken
uygun olanlarını shadcn CLI üzerinden projeye ekleyerek kullan:

Accordion, Alert, Alert Dialog, Aspect Ratio, Attachment, Avatar, Badge,
Breadcrumb, Bubble, Button, Button Group, Calendar, Card, Carousel, Chart,
Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date
Picker, Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Hover Card,
Input, Input Group, Input OTP, Item, Kbd, Label, Marker, Menubar, Message,
Message Scroller, Native Select, Navigation Menu, Pagination, Popover,
Progress, Questionnaire, Radio Group, Resizable, Scroll Area, Select,
Separator, Sheet, Sidebar, Skeleton, Slider, Spinner, Switch, Table, Tabs,
Textarea, Toast, Toggle, Toggle Group, Tooltip, Typography.

Özellikle:
- Section seperatörleri için **Separator**,
- Share / Copy Page menüleri için **Dropdown Menu** (ve gerekiyorsa Toast),
- Tema toggle kontrolü için **Switch** veya **Toggle**,

component'lerini değerlendir.


## Beklenen Çıktı

1. Güncellenmiş `settings.ts` (mevcut alanlar korunarak, gerekirse yeni
   alanlar eklenmiş hali).
2. Yeni layout sistemi (`default` / `wide` / `custom` destekli).
3. i18n kurulumu (yapılırsa).
4. Light/dark mode desteği.
5. Yeni tasarıma uygun tüm sayfa ve component'ler.
6. Değişikliklerin kısa bir özeti (hangi dosyalar eklendi/silindi/değişti).

## Başlamadan Önce

Projenin mevcut dosya yapısını, `settings.ts` içeriğini ve `content/`
klasöründeki dosya formatını incele, sonra bir uygulama planı sun.
