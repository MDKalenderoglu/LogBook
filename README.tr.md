# LogBook

**Not defteri, görev listesi ve karar günlüğü — tek sayfada, hiçbir şeyin üzerine yazılmadan.**

[![Canlı demo](https://img.shields.io/badge/demo-logbook-2ea44f)](https://mdkalenderoglu.github.io/LogBook/)
[![Lisans: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-kurulabilir-5a4fcf)](#kurulum)
[![Derleme yok](https://img.shields.io/badge/build-yok-lightgrey)](#mimari)

Her düzenlemenin öncesi saklanır. Fikir değiştirmek serbest — kaybettiğin, seni o fikre götüren gerekçe olmuyor. Çoğu not uygulamasının çöpe attığı kısım tam da bu.

**[Uygulamayı aç →](https://mdkalenderoglu.github.io/LogBook/)** Üyelik yok, kurulum yok, izleme yok. Verilerin kendi cihazında kalır.

🇬🇧 [English README](README.md)

---

## Neden LogBook?

| Sen ne yaşıyorsun? | LogBook ne yapıyor? |
|---|---|
| "Bu kararı geçen ay neden değiştirmiştim?" | Her düzenlemede önceki sürüm saklanır; Geçmiş'ten tek tıkla eski hâlini oku |
| "Toplantıda PDF'in üzerine not almak istiyorum" | PDF'i ve görselleri uygulama **içinde** aç, **Apple Pencil** ya da fareyle üzerine çiz |
| "Notlarım telefonda ayrı, bilgisayarda ayrı" | Google hesabınla tek tık giriş; tüm cihazların kendiliğinden eşitlenir |
| "Uygulama kurmak, hesap açmak istemiyorum" | Linki aç, bitti. İstersen ana ekrana ekle, gerçek uygulama gibi çalışsın |
| "Yazmaya üşeniyorum" | Türkçe konuş, yazıya dökülsün; ya da sesli not bırak |
| "Bir sonraki görüşmede konuşacaklarım dağınık kalıyor" | Herhangi bir notu tek tıkla, notların yanındaki mentör listesine al |

## Özellikler

- **Tek tuşla not** — yaz, Enter'a bas, tarih damgasıyla kaydedildi
- **Mentör & öğrenme sütunu** — sağda iki alan: danışmana veya ekibe iletilecek maddeler ve çalışma defteri. İkisi de notun sunduğu her şeyi destekler — metin, ek dosya, çizim, ses, tarihçe
- **Bölümlü çalışma defteri** — öğrenme alanı görev listesi değil, başvuru defteridir: kayıtların tamamlanma durumu yoktur, yazıldıkları yerde kalır. Bölümler istenen derinlikte iç içe kurulur, her birinin kendi yazma kutusu vardır
- **Triyaj işareti** — notu kırmızı, sarı veya yeşil olarak sınıflandır; kart buna göre renklenir, değişiklik günlüğe işlenir
- **Görüşme listesine al** — notu taşımadan ve çoğaltmadan mentör listesine ekle; ikinci tıkta listeden çıkar
- **Kalemle çizim** — PDF ve görsellerin üzerine Apple Pencil / fareyle yaz; 4 renk, fosforlu, silgi, geri al. Parmak kaydırır, kalem çizer
- **Düzenleme tarihçesi** — silmek yok, üzerine yazmak yok; her sürüm tarihiyle durur
- **Türkçe dikte** — konuş, metne dönüşsün (Web Speech API)
- **Ses kaydı** — dalga formlu oynatıcıyla notun içinde
- **Her tür dosya eki** — sürükle-bırak veya yapıştır; görsel ve PDF'ler uygulama içinde açılır; ekleri sırala, kaldır (kaldırma bile günlüğe işlenir)
- **İç içe kategoriler** — istediğin kadar derin; üst kategori alt notları da gösterir
- **Deadline geri sayımı** — "3 saat kaldı" canlı sayaç; yaklaşınca sarı, geçince kırmızı
- **Alt maddeler** — not içinde tikli mini görev listesi, ilerleme göstergeli
- **Otomatik tarih ayracı** — uzun aradan sonra döndüğünde notun devamına tarih düşülür; ne zaman ne düşündüğün metnin kendisinde görünür
- **Tam günlük** — her ekleme, düzenleme, tamamlama tarihiyle kayıtta
- **Açık / koyu tema**
- **Google Drive senkronu** — notların kendi Drive'ının gizli uygulama alanında; uygulama diğer dosyalarını göremez
- **Tek dosyalık yedek** — sesler ve ekler dahil her şey tek JSON'da
- **Kurulabilir (PWA)** — ana ekrana ekle, tam ekran, çevrimdışı bile açılır

## Kurulum

**Önce linki aç:** <https://mdkalenderoglu.github.io/LogBook/>

| Cihaz | Yapman gereken |
|---|---|
| **iPhone / iPad** (Safari) | Paylaş (□↑) → **Ana Ekrana Ekle** |
| **Android** (Chrome) | Menü (⋮) → **Uygulamayı yükle** |
| **Windows** (Chrome/Edge) | Adres çubuğundaki yükle simgesi → Yükle |
| **macOS** (Safari) | Dosya → **Dock'a Ekle** · (Chrome: adres çubuğundan Yükle) |

Artık kendi ikonuyla, tam ekran, gerçek bir uygulama gibi açılır — internet yokken bile.

> **Tamamen çevrimdışı (ZIP):** **Code → Download ZIP** ile indir, `LogBook.html`'e çift tıkla. Not alma, ekler, yedekleme hepsi çalışır. Yalnızca Google senkronu bir web adresi ister (Google güvenlik kuralı). macOS'ta `mac/LogBook.app`'i Dock'a sürükle — ilk açılışta sağ tık → Aç.

## Verilerin nerede?

**Varsayılan: tamamen kendi cihazında.** Notlar tarayıcının yerel deposunda, sesler ve dosyalar IndexedDB'de. Hiçbir sunucuya gönderilmez.

Cihazlar arası eşitleme için kenar çubuğundan **Senkron** → Google girişi. Notların kendi Google Drive'ının `appDataFolder` bölmesine yazılır: normal Drive arayüzünde görünmez, yalnızca bu uygulama erişebilir. Uygulama Drive'ının geri kalanı için hiçbir izin istemez. Bağlantıyı kestiğinde veriler sende kalır.

**Üç katmanlı dayanıklılık:**

1. **Yerel** — her tuş vuruşu cihaza kaydedilir
2. **Bulut** — değişiklikten 4 sn sonra, 90 sn'de bir ve her açılışta Drive'a eşitlenir. Çakışmada hiçbir tarihçe kaybolmaz: loglar ve eski sürümler daima birleşir
3. **Elle** — sesler ve ekler dahil tek JSON dışa aktar, istediğin gibi taşı, başka cihazda geri yükle — geri yükleme o cihazın senkron bağlantısını bozmaz

> ⚠️ Tarayıcı site verilerini temizlersen yerel notlar da gider. Senkronu açık tut ya da arada bir yedek al.

## Mimari

Tek HTML dosyası. Framework yok, derleme yok, sunucu yok, izleme yok. `index.html` uygulamanın tamamı; `LogBook.html` aynı dosyanın çift-tıklanabilir kopyası. Service worker çevrimdışı kabuk sağlar; PDF motoru (pdf.js) ilk kullanımda bir kez indirilir, sonra önbellekten çalışır.

```
LogBook/
├── index.html            # uygulama (tek dosya)
├── LogBook.html          # aynı dosyanın kopyası, ZIP indirenler için
├── manifest.webmanifest  # PWA kimliği
├── sw.js                 # çevrimdışı önbellek
├── assets/               # uygulama ikonları
└── mac/LogBook.app       # macOS için tek-tık başlatıcı
```

## Lisans

[MIT](LICENSE) — özgürce kullan, paylaş, geliştir.
