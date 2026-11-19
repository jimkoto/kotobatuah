# jimkoto.my.id — Final Dark Grid Responsive + Hybrid

Background disamakan seperti lampiran dark navy grid #0A1220 (screenshot kamu 02/10/2026).
Responsive: header & footer nav tetap ada di smartphone (tidak display:none).

## Struktur 8 items + assets (komplit)
- cookies/, disclaimer/, privacy-policy/, tos/ (legal untuk E-E-A-T)
- functions/api/articles.ts (Secure Core JWT)
- assets/img/logo.svg, favicon
- _headers, index.html, README.md

## Deploy Hostinger
Upload semua ke public_html/. Pastikan .htaccess:
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ index.html [L]

## Deploy GitHub + Cloudflare Pages
git add . && git commit -m "final dark grid responsive" && git push
Env: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_JSON
