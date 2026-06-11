# Foydalanuvchi qo'llanmasi

ARVideo — telefon brauzerida ishlaydigan AR/VR ilova. Ilova o'rnatish shart emas: foydalanuvchi QR kodni skanerlaydi, kamerani rasmga tutadi va video / rasm / 3D modelni real 3D ko'rinishda ko'radi.

## Sahifalar

### 🏠 Bosh sahifa — `index.html`

Barcha bo'limlarga kirish nuqtasi: AR Demo, QR Skaner, AR Yaratish, VR Ko'rish.

### 🎯 AR Ko'rish — `ar.html`

Kamera marker rasmni taniydi va uning ustida kontent ko'rsatadi.

**Foydalanish:**
1. Sahifani oching → **Kamerani yoqish** tugmasini bosing.
2. Kamera ruxsatini bering.
3. Kamerani marker rasmga tuting (20–50 sm masofadan, yaxshi yorug'likda).
4. Marker topilganda kontent paydo bo'ladi. Video bo'lsa — ovozni yoqish uchun ekranga bir marta bosing.

**URL parametrlari** (QR kod shu parametrli havolani ochadi):

| Parametr | Ma'nosi | Misol |
|---|---|---|
| `mind` | `.mind` marker fayli URL'i | `targets/box.mind` |
| `type` | `video`, `model` yoki `image` | `video` |
| `src` | Kontent fayli URL'i | `media/reklama.mp4` |
| `scale` | Kontent o'lchami (default `1`) | `1.5` |
| `w`, `h` | Video/rasm eni-bo'yi nisbati (default `1` × `0.55`) | `w=1&h=0.75` |

Misol:

```
ar.html?mind=targets/box.mind&type=video&src=media/reklama.mp4&scale=1
```

Parametrsiz ochilsa demo rejim ishlaydi (namuna marker + 3D model).

### 🔳 QR Skaner — `scan.html`

Ilova ichidagi QR skaner. QR kod ichidagi havola avtomatik ochiladi. Foydalanuvchi oddiy telefon kamerasi bilan ham QR'ni skanerlashi mumkin — natija bir xil.

### 🛠 AR Yaratish — `create.html`

O'z AR tajribangizni 3 bosqichda yaratasiz:

1. **Marker rasm** — rasm yuklang va **kompilyatsiya** tugmasini bosing. Brauzer rasmni tahlil qilib `targets.mind` fayl yaratadi (30–60 soniya). Faylni yuklab oling.
2. **Kontent** — `.mind` faylni hostingga joylab URL'ini kiriting; kontent turini (video/model/rasm) tanlang va kontent URL'ini kiriting.
3. **QR kod** — tayyor havola va QR kod generatsiya qilinadi. QR'ni chop etib marker rasm yoniga joylang.

### 🥽 VR Ko'rish — `vr.html`

360° video, 360° rasm yoki 3D modelni VR rejimda ko'rish. Telefonda ekran pastidagi **VR tugmasi** bosilsa Cardboard (ikki ko'zli) rejim yoqiladi.

| Parametr | Qiymatlar |
|---|---|
| `type` | `360video`, `360image`, `model` |
| `src` | Kontent URL'i |
| `scale` | Model o'lchami (faqat `model` uchun) |

Misollar:

```
vr.html?type=360video&src=media/tour.mp4
vr.html?type=model&src=media/detal.glb&scale=2
```

## Amaliy stsenariylar

**📦 Mahsulot qadog'i:** qadoq surati → marker; reklama videosi → kontent. QR kod qadoqqa bosiladi. Xaridor QR'ni skanerlaydi, kamerani qadoqqa tutadi — qadoq ustida video o'ynaydi.

**🏭 Texnik detal / zavod:** detal chizmasi → marker; detalning 3D modeli (`.glb`) → kontent. Ishchi chizmani kameraga tutsa detalning 3D modelini har tomondan aylantirib ko'radi.

**🎓 Ta'lim:** darslik sahifasi → marker; tushuntiruvchi video yoki 3D model (organ, molekula, mexanizm) → kontent.

**🏛 Muzey / turizm:** eksponat lavhasi → marker; tarixiy video → kontent. Yoki QR → `vr.html` bilan 360° virtual sayohat.

## Yaxshi natija uchun maslahatlar

- Markerni **yaxshi yorug'likda**, 20–50 sm masofadan tuting.
- Marker tekis tursin — buklangan/yaltiragan yuzalar yomon taniladi.
- Telefonni sekin harakatlantiring; marker ekranda to'liq ko'rinsin.
- Birinchi ochilishda kontent yuklanishi uchun bir necha soniya kuting (internet tezligiga bog'liq).
