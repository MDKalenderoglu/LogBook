# ☁️ Bulut Senkronu Kurulumu (yayıncı için — bir kez yapılır)

Uygulamayı dağıtan kişi olarak senkronun çalışması için ücretsiz bir Supabase projesi açman gerekiyor. **10 dakika sürer, kredi kartı istemez, terminal gerekmez.** Kullanıcıların hiçbir şey kurması gerekmez — onlar sadece uygulamada bir "senkron anahtarı" belirler.

## Adımlar

1. **supabase.com** → **Start your project** → **GitHub ile giriş yap** (GitHub hesabın zaten var).
2. **New project** de:
   - Name: `NoteBookMD`
   - Database Password: güçlü bir şifre üret (bir yere not et, ama uygulama bunu kullanmaz)
   - Region: `Frankfurt (eu-central-1)` (Türkiye'ye en yakın)
   - **Create new project** → 1-2 dakika bekle.
3. Sol menüden **SQL Editor** → **New query** → aşağıdaki kodu yapıştır → **Run**:

```sql
create table if not exists notebookmd (
  id text primary key,
  data text,
  updated_at timestamptz default now()
);
alter table notebookmd enable row level security;
create policy "nbmd anon erisim" on notebookmd
  for all to anon using (true) with check (true);
```

4. Sol alttaki **⚙️ Project Settings → API** sayfasından iki değeri kopyala:
   - **Project URL** (örn. `https://abcdefgh.supabase.co`)
   - **anon / public** key (uzun bir metin)
5. `NoteBookMD.html` ve `index.html` dosyalarında şu satırları bul ve doldur:

```js
const SYNC_CFG={
  url:"",   // ← Project URL buraya
  anon:""   // ← anon key buraya
};
```

Bu kadar. Dosyaları GitHub'a push'layınca senkron herkes için aktif olur.

## Güvenlik notları

- **anon key gizli değildir** — uygulamayla birlikte dağıtılması normaldir (tüm Supabase uygulamaları böyle çalışır).
- Kullanıcı verileri buluta **her zaman AES-256 ile şifrelenmiş** gider; Supabase panelinden bile içerik okunamaz. Şifre çözme anahtarı yalnızca kullanıcının kendi cihazındadır.
- Supabase ücretsiz planı 500 MB veritabanı verir; binlerce not-ses-dosya için fazlasıyla yeterlidir.
