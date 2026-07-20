# 📝 LogBook — hiçbir fikrini kaybetme

**Not defteri + görev listesi + karar günlüğü, tek uygulamada.** OneNote'un gücü, To-Do'nun pratikliği — ama bir farkla: **LogBook'ta hiçbir şey silinmez.** Her düzenlemenin öncesi saklanır, ne zaman ne eklediğin tarihiyle durur. Fikir değiştirmek serbest; geçmişini kaybetmek yok.

> 🚀 **Hemen dene, kurulum yok:** <https://mdkalenderoglu.github.io/LogBook/>
>
> Linki aç, yazmaya başla. Üyelik yok, ücret yok, reklam yok. Verilerin kendi cihazında kalır.

---

## Neden LogBook?

| Sen ne yaşıyorsun? | LogBook ne yapıyor? |
|---|---|
| "Bu kararı geçen ay neden değiştirmiştim?" | Her düzenlemede önceki sürüm saklanır; Geçmiş'ten tek tıkla eski hâlini oku |
| "Toplantıda PDF'in üzerine not almak istiyorum" | PDF'i ve görselleri uygulama **içinde** aç, **Apple Pencil** ya da fareyle üzerine çiz |
| "Notlarım telefonda ayrı, bilgisayarda ayrı" | Google hesabınla tek tık giriş; tüm cihazların kendiliğinden eşitlenir |
| "Uygulama kurmak, hesap açmak istemiyorum" | Linki aç, bitti. İstersen ana ekrana ekle, gerçek uygulama gibi çalışsın |
| "Yazmaya üşeniyorum" | 🗣 Türkçe konuş, yazıya dökülsün; ya da 🎤 sesli not bırak |

## ✨ Neler var?

- ⚡ **Tek tuşla not** — yaz, Enter'a bas, tarih damgasıyla kaydedildi
- ✏️ **Kalemle çizim (OneNote tarzı)** — PDF ve görsellerin üzerine Apple Pencil / fareyle yaz; 4 renk, fosforlu, silgi, geri al. Parmak kaydırır, kalem çizer. Uzun belgelerde hep görünen **✕ Kapat** çubuğu
- 📜 **Düzenleme tarihçesi** — silmek yok, üzerine yazmak yok; her sürüm tarihiyle durur
- 🗣 **Türkçe dikte** — konuş, metne dönüşsün (hızlı notta ve editörde)
- 🎤 **Ses kaydı** — dalga formlu oynatıcıyla notun içinde
- 📎 **Her tür dosya eki** — sürükle-bırak veya yapıştır; görsel ve PDF'ler uygulama içinde açılır; ekleri ↑↓ sırala, 🗑 kaldır (kaldırma bile günlüğe işlenir)
- 🏷 **İç içe kategoriler** — Genel › Toplantılar › Haftalık… istediğin kadar derin; üst kategori alt notları da gösterir
- ⏳ **Deadline geri sayımı** — "3 saat kaldı" canlı sayaç; yaklaşınca sarı, geçince kırmızı
- ☑ **Alt maddeler** — not içinde tikli mini görev listesi (2/5 ilerleme)
- ⏱ **Otomatik tarih ayracı** — uzun aradan sonra döndüğünde notun devamına tarih düşülür: ne zaman ne düşündüğün belli olur
- 🕘 **Tam günlük** — her ekleme, düzenleme, tamamlama tarihiyle kayıtta
- 🌗 **Açık / koyu tema** — göz yormayan ılık tonlar
- ☁️ **Google Drive senkronu** — notların kendi Drive'ının **gizli uygulama alanında**; uygulama diğer dosyalarını göremez
- 💾 **Tek dosyalık yedek** — sesler ve ekler dahil her şey tek JSON'da; başka cihazda tek tıkla geri yükle
- 📲 **Kurulabilir (PWA)** — ana ekrana ekle, kendi ikonuyla tam ekran, **çevrimdışı bile açılır**

## 📲 Kurulum — 30 saniye, her cihazda

**Önce linki aç:** <https://mdkalenderoglu.github.io/LogBook/>

| Cihaz | Yapman gereken |
|---|---|
| **iPhone / iPad** (Safari) | Paylaş düğmesi (□↑) → **Ana Ekrana Ekle** |
| **Android** (Chrome) | Menü (⋮) → **Ana ekrana ekle** / **Uygulamayı yükle** |
| **Windows PC** (Chrome/Edge) | Adres çubuğundaki **yükle simgesi** (⊕/monitör) → Yükle |
| **Mac** (Safari) | Dosya → **Dock'a Ekle** · (Chrome: adres çubuğundan Yükle) |

Artık kendi ikonuyla, tam ekran, gerçek bir uygulama gibi açılır — internet yokken bile.

> 💻 **İnternetsiz kullanım (ZIP):** GitHub'dan **Code → Download ZIP** indir, `LogBook.html`'e çift tıkla. Not alma, ekler, yedekleme hepsi çalışır. Yalnızca Google senkronu web adresi ister (Google güvenlik kuralı). 🍎 Mac'te `mac/LogBook.app`'i Dock'a sürükleyip tek tıkla açabilirsin (ilk açılışta sağ tık → Aç).

## 🔒 Verilerin nerede?

**Varsayılan: yüzde yüz kendi cihazında.** Notlar tarayıcının yerel deposunda, sesler ve dosyalar tarayıcının veritabanında. Hiçbir sunucuya gönderilmez.

Cihazlar arası eşitleme istersen sol alttan **☁️ Senkron** → Google girişi. Notların kendi Google Drive'ının `appDataFolder` denen gizli bölmesine yazılır: normal Drive arayüzünde görünmez, yalnızca bu uygulama erişebilir, uygulama da Drive'daki **başka hiçbir dosyanı göremez**. Bağlantıyı kestiğinde veriler sende kalır.

**Yedekleme mimarisi (kemer + pantolon askısı):**
1. **Anlık:** her tuş vuruşu cihaza kaydedilir
2. **Bulut:** değişiklikten 4 sn sonra + 90 sn'de bir + her açılışta Drive'a eşitlenir; çakışmada hiçbir tarihçe kaybolmaz (loglar ve eski sürümler daima birleşir)
3. **Elle:** **⬇︎ Yedek** ile sesler-ekler dahil tek JSON indir; AirDrop/e-posta ile taşı, **⬆︎ Geri Yükle** ile aç — geri yükleme cihazın senkron bağlantısını bozmaz

> ⚠️ Tarayıcı site verilerini temizlersen yerel notlar da gider. Senkronu açık tut ya da arada bir **Yedek** al.

## 🛠 Teknik (meraklısına)

Tek HTML dosyası. Framework yok, derleme yok, sunucu yok, izleme yok. `index.html` = uygulamanın tamamı (`LogBook.html` aynı dosyanın çift-tıklanabilir kopyası). Service worker çevrimdışı kabuk sağlar; PDF motoru (pdf.js) ilk kullanımda bir kez indirilir, sonra önbellekten çalışır.

```
LogBook/
├── index.html            ← uygulama (tek dosya)
├── LogBook.html          ← aynı dosya, ZIP indirenler için
├── manifest.webmanifest  ← PWA kimliği
├── sw.js                 ← çevrimdışı önbellek
├── assets/               ← uygulama ikonları
└── mac/LogBook.app       ← Mac için tek-tık başlatıcı
```

## 📄 Lisans

MIT — özgürce kullan, paylaş, geliştir.
