# Arxitektura

## Umumiy ko'rinish

ARVideo — **serverless statik web ilova**. Backend yo'q, ma'lumotlar bazasi yo'q; barcha logika foydalanuvchi brauzerida ishlaydi. Kontent (marker, video, model) oddiy statik fayllar sifatida xizmat qilinadi.

```
┌─────────────────────────────────────────────────────┐
│                Foydalanuvchi telefoni                │
│                                                     │
│  QR skanerlash ──► ar.html?mind=...&type=...&src=...│
│                          │                          │
│                          ▼                          │
│   ┌──────────┐    ┌────────────┐    ┌────────────┐  │
│   │  Kamera  │──► │   MindAR    │──► │  A-Frame   │  │
│   │  oqimi   │    │ (tracking)  │    │ (3D sahna) │  │
│   └──────────┘    └────────────┘    └────────────┘  │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS
          ┌───────────────┴───────────────┐
          │     Statik hosting (Pages)    │
          │  html/css/js  targets/  media/│
          └───────────────────────────────┘
```

## Texnologiyalar

| Qatlam | Texnologiya | Versiya | Vazifa |
|---|---|---|---|
| 3D/VR sahna | [A-Frame](https://aframe.io) | 1.4.2 | WebGL ustida deklarativ 3D, WebXR/Cardboard VR |
| AR tracking | [MindAR](https://hiukim.github.io/mind-ar-js-doc/) | 1.2.5 | Rasm (image target) tracking, brauzerda kompilyatsiya |
| QR o'qish | [html5-qrcode](https://github.com/mebjas/html5-qrcode) | 2.3.8 | Kamera orqali QR skanerlash |
| QR yaratish | qrcodejs | 1.0.0 | QR kod generatsiyasi |

A-Frame 1.4.2 tanlangan, chunki MindAR 1.2.x rasman shu versiya bilan moslashtirilgan.

## Fayl tuzilishi

```
arvideo/
├── index.html        # Bosh sahifa
├── ar.html           # AR ko'rish (MindAR + A-Frame)
├── scan.html         # QR skaner
├── create.html       # Marker kompilyatsiyasi + QR generatsiya
├── vr.html           # VR ko'rish (360/3D)
├── css/style.css     # Umumiy uslublar
├── targets/          # .mind marker fayllari
├── media/            # video / model / rasm fayllari
└── docs/             # hujjatlar
```

## Asosiy oqimlar

### AR ko'rish oqimi (`ar.html`)

1. URL parametrlari o'qiladi (`mind`, `type`, `src`, `scale`, `w`, `h`).
2. Foydalanuvchi tugma bosganda A-Frame sahna **dinamik** quriladi (kamera ruxsati faqat shu paytda so'raladi).
3. MindAR `.mind` faylni yuklab, kamera oqimida marker qidiradi.
4. `targetFound` hodisasida kontent ko'rsatiladi, video bo'lsa `play()` chaqiriladi; `targetLost` da pauza.
5. Brauzer autoplay siyosati tufayli video `muted` boshlanadi; birinchi bosishda ovoz yoqiladi.

### Marker yaratish oqimi (`create.html`)

1. Foydalanuvchi rasm yuklaydi.
2. `MINDAR.IMAGE.Compiler` rasmdagi xususiyat nuqtalarini (feature points) ajratadi — bu og'ir hisob, web worker'larda 30–60 soniya ishlaydi.
3. Natija `.mind` binar fayl sifatida yuklab olinadi.
4. Foydalanuvchi `.mind` va kontent URL'larini kiritgach, `ar.html?...` havolasi quriladi va QR kod chiziladi.

### QR oqimi

QR kod ichida oddiy URL saqlanadi. Shu sababli **istalgan** QR skaner (telefonning standart kamerasi ham) ishlaydi — `scan.html` faqat qulaylik uchun.

## Muhim cheklovlar va qarorlar

- **HTTPS majburiy** — `getUserMedia` (kamera) faqat secure context'da ishlaydi.
- **CORS** — video/model fayllar boshqa domendan yuklansa `Access-Control-Allow-Origin` ochiq bo'lishi kerak. Shu sababli kontentni sayt bilan bir domenda (`media/`) saqlash tavsiya etiladi.
- **Build yo'q** — ataylab: deploy har qanday statik hostingda bir qadam. Kutubxonalar CDN'dan versiya-pin qilingan holda yuklanadi.
- **Holatsizlik** — foydalanuvchi kontenti saqlanmaydi; har bir AR tajriba URL parametrlari bilan to'liq tavsiflanadi. Bu QR kodni "ma'lumotlar bazasi" sifatida ishlatish imkonini beradi.

## Kengaytirish nuqtalari

- **Bir nechta marker**: MindAR bitta `.mind` faylda bir nechta targetni qo'llaydi (`targetIndex: 0,1,2...`). `ar.html` ga `index` parametri qo'shish kifoya.
- **Lokatsiya AR** (GPS asosida): AR.js `gps-camera` komponenti bilan alohida sahifa.
- **Yuz tracking**: MindAR'ning `mindar-face` moduli bilan (masalan, virtual ko'zoynak primerkasi).
- **Backend qo'shish**: kontent boshqaruvi kerak bo'lsa — har qanday CMS yoki object storage (S3/R2) URL'lari mavjud parametr sxemasiga to'g'ridan-to'g'ri mos keladi.
