# Kawan-e9

Aplikasi web ringan dan ramah ponsel (*mobile-first* & *offline-ready*) sebagai kawan perjalanan dan utilitas harian.

<p align="center">
  <img src="./assets/logo-kawan-e9.png" alt="Logo Kawan-e9" width="160" />
</p>

## Fitur & Ketahanan Jangka Panjang
- **Siap Offline (PWA):** Menggunakan `manifest.json` dan `sw.js` agar aplikasi bisa dipasang ke layar utama ponsel dan tetap berjalan saat sinyal lemah.
- **Penyimpanan Lokal Aman:** Menggunakan `KawanE9.storage` (`localStorage` dengan perlindungan `try...catch`) sehingga tidak error di mode *Incognito*.
- **Perlindungan Tautan & Input:** Otomatis mengamankan tautan keluar (`rel="noopener noreferrer"`) serta menyediakan fungsi `KawanE9.escapeHTML()` untuk mencegah XSS.
- **Tanpa Data Sensitif:** Seluruh data bersifat publik/umum dan bebas dari informasi pribadi pengguna.

## Struktur File
```text
├── index.html               # Halaman utama aplikasi
├── manifest.json            # Konfigurasi Progressive Web App (PWA)
├── sw.js                    # Service Worker untuk caching & mode offline
├── kawan-e9-core.js         # Utilitas keamanan, storage, & deteksi offline
├── head-snippet.html        # Potongan tag <head> siap tempel ke index.html
├── favicon.ico              # Ikon tab browser (16/32/48 px)
├── .nojekyll                # Memastikan GitHub Pages menyajikan file apa adanya
└── assets/
    ├── logo-kawan-e9.png    # Logo utama (1024x1024 px)
    ├── icon-512.png         # Ikon PWA besar (512x512 px)
    ├── icon-192.png         # Ikon PWA standar (192x192 px)
    └── apple-touch-icon.png # Ikon perangkat Apple iOS (180x180 px)
```

## Cara Pasang ke `index.html`
1. Unggah seluruh isi paket ini ke folder root repositori GitHub Pages kamu.
2. Tempelkan isi `head-snippet.html` ke dalam bagian `<head>` file `index.html`.
3. Pastikan tidak ada data pribadi atau kredensial di dalam kode sebelum melakukan `git push`.

---
*Terakhir diperbarui: 22 November 2026*
