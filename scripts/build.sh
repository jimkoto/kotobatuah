#!/bin/sh
# Menyusun dist/ untuk Cloudflare Pages. Hanya yang disalin di sini yang tayang.
set -e
rm -rf dist && mkdir dist
cp -r index.html layanan karya kontak tentang legal imgs nazilah 404.html _headers _redirects robots.txt sitemap.xml site.webmanifest logo.jpg dist/
# bahan prospek dan proposal klien: jangan tayang
rm -rf dist/karya/zafrancoffee
echo "dist siap: $(find dist -type f | wc -l) file"
