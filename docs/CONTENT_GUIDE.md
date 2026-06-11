# Kontent tayyorlash qo'llanmasi

AR tajriba sifati to'g'ridan-to'g'ri marker rasm va kontent fayllari sifatiga bog'liq. Bu hujjat ularni to'g'ri tayyorlashni o'rgatadi.

## 1. Marker rasm

Marker — kamera taniydigan rasm. MindAR rasmdagi xususiyat nuqtalari (burchaklar, qirralar, kontrast o'tishlar) bo'yicha ishlaydi.

### Yaxshi marker

✅ Detallari ko'p (matn, logotip, naqsh, fotosurat)
✅ Yuqori kontrast
✅ Takrorlanmaydigan, asimmetrik kompozitsiya
✅ O'lcham: kamida 480×480 px, ideal 1000+ px
✅ Format: JPG yoki PNG

### Yomon marker

❌ Bir xil rangli / gradientli fonlar
❌ Takrorlanuvchi naqshlar (shaxmat katak, chiziqlar)
❌ Juda oddiy logotiplar (1–2 ta shakl)
❌ Yaltiroq / shaffof yuzalar surati

### Kompilyatsiya

1. `create.html` → rasm yuklang → **Kompilyatsiya**.
2. 30–60 soniya kuting (brauzer rasmni tahlil qiladi).
3. `targets.mind` faylni yuklab oling va `targets/` papkaga nomlab joylang (masalan `targets/quti1.mind`).

> Bitta `.mind` faylga bir nechta rasm ham kompilyatsiya qilish mumkin — buning uchun [MindAR rasmiy kompilyatori](https://hiukim.github.io/mind-ar-js-doc/tools/compile)dan foydalaning.

### Chop etish

- Markerni kamida 8×8 sm o'lchamda chop eting.
- Mat (yaltiramaydigan) qog'oz yaxshiroq.
- QR kodni marker **yoniga** joylang (ustiga emas — QR marker tanilishiga xalaqit beradi).

## 2. Video

| Parametr | Tavsiya |
|---|---|
| Format | MP4 (H.264 + AAC) — barcha brauzerlarda ishlaydi |
| O'lcham | 720p yetarli (1080p — katta hajm, sekin yuklanadi) |
| Davomiylik | 15–60 soniya (uzun video = uzoq yuklanish) |
| Hajm | < 20 MB ideal |
| Nisbat | `ar.html` da `w`/`h` parametrlari bilan moslang: 16:9 video uchun `w=1&h=0.5625` |

Siqish uchun (ffmpeg):

```bash
ffmpeg -i kirish.mp4 -vcodec h264 -crf 28 -preset slow -vf scale=1280:-2 -acodec aac chiqish.mp4
```

> **Ovoz:** brauzerlar avtoijroda ovozni bloklaydi — video ovozsiz boshlanadi, foydalanuvchi ekranga bossa ovoz yoqiladi. Bu ilovada allaqachon hal qilingan.

## 3. 3D model

| Parametr | Tavsiya |
|---|---|
| Format | **GLB** (bitta fayl, tavsiya) yoki glTF |
| Poligonlar | < 100k uchburchak (telefon uchun) |
| Teksturalar | 1024×1024 yetarli, 2048 maksimal |
| Hajm | < 10 MB ideal |
| Animatsiya | glTF animatsiyalari avtomatik o'ynaydi (`animation-mixer`) |

**Qayerdan olish / yasash:**
- [Sketchfab](https://sketchfab.com) — minglab bepul CC modellari (GLB yuklab olish bor)
- [Blender](https://blender.org) — o'zingiz yasash/eksport (File → Export → glTF 2.0)
- CAD detallar: STEP/STL → Blender orqali GLB ga aylantiring

**O'lcham muammosi:** model juda katta/kichik chiqsa `scale` parametri bilan to'g'rilang:

```
ar.html?...&scale=0.5    (ikki marta kichik)
ar.html?...&scale=3      (uch marta katta)
```

## 4. 360° kontent (VR uchun)

- **360° video/rasm**: equirectangular (2:1 nisbat, masalan 4096×2048) formatda bo'lishi kerak.
- 360° kameralar (Insta360, GoPro Max) yoki Google Street View ilovasi bilan suratga olinadi.
- `vr.html?type=360video&src=...` yoki `type=360image` bilan ochiladi.

## 5. Fayllarni joylash va nomlash

```
targets/
├── quti-kofe.mind
└── plakat-muzey.mind
media/
├── kofe-reklama.mp4
├── eksponat-tarix.mp4
└── detal-motor.glb
```

- Faqat lotin harflari, raqam va `-` ishlating (bo'sh joy va kirilcha URL'da muammo tug'diradi).
- Push qilingach URL: `https://<username>.github.io/arvideo/media/kofe-reklama.mp4`

## 6. To'liq misol: mahsulot qadog'i uchun AR video

1. Qadoq old tomonini tekis yorug'likda suratga oling → `create.html` da kompilyatsiya → `targets/quti-kofe.mind`.
2. Reklama videoni siqing → `media/kofe-reklama.mp4`.
3. Ikkala faylni repoga push qiling.
4. `create.html` 2–3 bosqichda URL'larni kiriting:
   - mind: `https://<username>.github.io/arvideo/targets/quti-kofe.mind`
   - type: `video`, src: `https://<username>.github.io/arvideo/media/kofe-reklama.mp4`
5. QR kodni yuklab oling, qadoqqa bosing. Tayyor ✅
