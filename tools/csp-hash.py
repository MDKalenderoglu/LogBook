#!/usr/bin/env python3
"""LogBook — CSP özetini güncelle.

index.html içindeki uygulama kodu (tek satır içi <script>) her değiştiğinde
Content-Security-Policy meta etiketindeki 'sha256-…' değeri de güncellenmelidir;
aksi halde tarayıcı uygulamanın kendi kodunu engeller. Kullanım:

    python3 tools/csp-hash.py index.html LogBook.html
"""
import base64, hashlib, re, sys

def guncelle(yol):
    s = open(yol, encoding="utf-8").read()
    satir_ici = re.findall(r"<script>(.*?)</script>", s, re.S)
    if len(satir_ici) != 1:
        sys.exit(f"{yol}: tam bir satır içi <script> bekleniyordu, {len(satir_ici)} bulundu")
    ozet = "sha256-" + base64.b64encode(hashlib.sha256(satir_ici[0].encode("utf-8")).digest()).decode()
    yeni, adet = re.subn(r"'sha256-[A-Za-z0-9+/=]+'", f"'{ozet}'", s, count=1)
    if adet != 1:
        sys.exit(f"{yol}: CSP içinde 'sha256-…' bulunamadı")
    open(yol, "w", encoding="utf-8").write(yeni)
    print(f"{yol}: {ozet}")

for yol in sys.argv[1:] or ["index.html"]:
    guncelle(yol)
