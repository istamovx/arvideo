#!/usr/bin/env bash
# CDN skriptlari uchun SRI (Subresource Integrity) hash'larini generatsiya qiladi.
#
# DIQQAT: bu skriptni CDN hostlariga kirish ochiq bo'lgan muhitda ishga tushiring
# (masalan, o'z kompyuteringizda). Cloud konteyner egress siyosati CDN'larni
# bloklasa, hash'lar noto'g'ri chiqadi.
#
# Foydalanish:
#   bash scripts/gen-sri.sh
#
# So'ng chiqarilgan `integrity="..."` qiymatini mos <script> tegiga qo'shing va
# `crossorigin="anonymous"` atributini ham qo'shing. MUHIM: resurs CORS'ni
# qo'llab-quvvatlashi shart, aks holda brauzer SRI bilan uni bloklaydi.
# (jsDelivr, cdnjs, unpkg CORS'ni qo'llab-quvvatlaydi; aframe.io ni tekshiring —
# qo'llab-quvvatlamasa, faylni o'zingiz hosting qiling.)

set -euo pipefail

urls=(
  "https://aframe.io/releases/1.4.2/aframe.min.js"
  "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"
  "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image.prod.js"
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
  "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"
)

for u in "${urls[@]}"; do
  hash=$(curl -fsSL "$u" | openssl dgst -sha384 -binary | openssl base64 -A)
  echo "$u"
  echo "  integrity=\"sha384-$hash\" crossorigin=\"anonymous\""
  echo
done
