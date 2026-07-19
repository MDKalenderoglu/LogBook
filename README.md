# 📝 NoteBookMD

**Hızlı not + görev uygulaması.** OneNote'un not alma gücü ile Microsoft To-Do'nun görev pratikliğini birleştirir. Kurulum yok, hesap yok, internet şartı yok — verileriniz kendi cihazınızda kalır.

## ✨ Özellikler

- ⚡ **Tek tuşla not** — yaz, Enter'a bas, kaydedildi (otomatik tarih-saat damgasıyla)
- 🎤 **Ses kaydı** — dalga formlu şık oynatıcıyla
- 📎 **Dosya ekleri** — görsel, PDF, Word, her tür dosya; sürükle-bırak veya yapıştır. Görseller ve PDF'ler uygulamanın **içinde** görüntülenir
- ⏳ **Deadline geri sayımı** — "3 saat kaldı" gibi canlı sayaç; yaklaşınca sarı, geçince kırmızı
- 🏷 **Tek tıkla kategori** — notları anında kategorilere ayır
- ☑ **Alt maddeler** — not içinde tikli mini görev listesi (2/5 ilerleme göstergesiyle)
- 📑 **Alt başlıklar** — satıra `## ` ile başla, başlık olsun; linkler otomatik tıklanabilir
- ✅ **Biten işler arşivi** — tik at, arşive gitsin; **hiçbir şey silinmez**
- 🕘 **Tam günlük** — her ekleme, düzenleme, değişiklik tarihiyle loglanır
- 🌗 **Açık / koyu tema** — göz yormayan, ılık tonlar
- 💾 **Yedekleme** — tek dosyalık JSON yedek al, başka cihazda geri yükle
- ☁️ **Otomatik bulut senkronu** — Google hesabınla tek tık giriş yap; notların kendi Google Drive'ının **gizli uygulama alanında** saklanır ve tüm cihazlarında otomatik eşitlenir. Uygulama Drive'daki diğer dosyalarını göremez, onlara dokunamaz

## 🚀 Kurulum (30 saniye)

### Bilgisayar (Mac veya Windows)

1. Bu sayfanın üstündeki yeşil **Code** düğmesine, sonra **Download ZIP**'e tıklayın.
2. İnen ZIP dosyasını çift tıklayıp açın.
3. **`NoteBookMD.html`** dosyasına çift tıklayın. Bu kadar! Uygulama tarayıcınızda açılır.

> 🍎 Mac kullanıcıları: klasördeki **NoteBookMD.app**'i Dock'a sürükleyerek gerçek bir uygulama gibi tek tıkla açabilirsiniz. İlk açılışta macOS uyarı verirse: simgeye sağ tıklayın → **Aç** deyin (bir kere yeterli).

### Telefon ve tablet (iPhone, iPad, Android)

Bu repo GitHub Pages ile yayınlandıysa site linkini telefonunuzun tarayıcısında açın, sonra:

- **iPhone/iPad:** Paylaş düğmesi → **Ana Ekrana Ekle**
- **Android:** Menü (⋮) → **Ana ekrana ekle**

Artık ana ekranınızda kendi simgesiyle, tam ekran bir uygulama olarak durur.

## 🔒 Verileriniz nerede?

**Varsayılan olarak tamamen sizin cihazınızda.** Notlar tarayıcınızın yerel deposunda (localStorage), ses kayıtları ve dosyalar yine tarayıcının kendi veritabanında (IndexedDB) saklanır.

Cihazlar arası eşitleme istiyorsanız sol alttaki **☁️ Senkron** düğmesine tıklayıp Google hesabınızla giriş yapın — notlarınız kendi Google Drive'ınızın gizli uygulama alanında (`appDataFolder`) saklanır ve her değişiklik otomatik eşitlenir. Bu alan normal Drive arayüzünde görünmez, sadece bu uygulama erişebilir; siz bağlantıyı kesene kadar orada kalır. Senkron kullanmıyorsan elle taşıma da mümkün:

1. Kaynak cihazda sol alttaki **⬇︎ Yedek** düğmesiyle JSON dosyası indirin (ses ve dosya ekleri dahildir).
2. Bu dosyayı hedef cihaza gönderin (AirDrop, e-posta, WhatsApp…).
3. Hedef cihazda **⬆︎ Geri Yükle** ile açın.

> ⚠️ Önemli: Tarayıcı geçmişini/site verilerini temizlerseniz notlarınız da silinir. Arada bir **Yedek** almayı alışkanlık edinin.

## 🛠 Teknik

Tek bir HTML dosyası. Framework yok, bağımlılık yok, derleme yok. `NoteBookMD.html` = uygulamanın tamamı. `index.html` aynı dosyanın kopyasıdır (GitHub Pages'in siteyi kökten sunabilmesi için).

## 📄 Lisans

MIT — özgürce kullanın, paylaşın, geliştirin.
