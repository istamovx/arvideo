# ARVideo — WebAR/WebVR ilova

Brauzerda ishlaydigan AR/VR ilova: **rasm (marker) yoki QR kod kameraga tutilganda ustida video, rasm yoki 3D model real 3D ko'rinishda paydo bo'ladi**. Hech qanday mobil ilova o'rnatish shart emas — Chrome/Safari'da ochiladi.

## Imkoniyatlar

| Sahifa | Vazifasi |
|---|---|
| `index.html` | Bosh sahifa — barcha bo'limlarga kirish |
| `ar.html` | AR ko'rish: kamera marker rasmni taniydi va ustida video / rasm / 3D model ko'rsatadi |
| `scan.html` | QR skaner: QR koddagi AR/VR havolani ochadi |
| `create.html` | O'z AR tajribangizni yaratish: rasm → `.mind` marker, kontent biriktirish, QR kod generatsiyasi |
| `vr.html` | VR ko'rish: 360° video, 360° rasm yoki 3D modelni VR rejimda (Cardboard tugmasi bilan) tomosha qilish |
| `components.html` | Dizayn tizimi ko'rgazmasi: Button, Input, Select, Dropdown, Checkbox, Toggle, Radio, Calendar, Textarea va boshqalar |

Texnologiyalar: [MindAR](https://hiukim.github.io/mind-ar-js-doc/) (rasm tracking), [A-Frame](https://aframe.io) (3D/VR sahna), [html5-qrcode](https://github.com/mebjas/html5-qrcode) (QR skaner), qrcodejs (QR generatsiya). Hammasi CDN orqali yuklanadi — build talab qilinmaydi.

**Dizayn:** interfeys [Untitled UI](https://www.untitledui.com) dizayn tizimi (Blue palitra, Inter shrifti) asosida qurilgan — tokenlar va komponentlar `css/style.css` da, interaktiv qismlar `js/ui.js` da.

## Ishga tushirish

Kamera faqat **HTTPS** (yoki `localhost`) da ishlaydi.

### Lokal sinash

Repo bilan birga keladi — Node.js (tashqi paketsiz) dev server:

```bash
# repo papkasida
npm start                 # http://localhost:8000
# yoki: node server.js
```

Telefonda (LAN orqali) kamerani sinash uchun HTTPS kerak. Server o'z-o'zidan
sertifikat yaratadi:

```bash
npm run https             # yoki: node server.js --https
```

So'ng telefonda terminalda ko'rsatilgan `https://<kompyuter-IP>:8000` manzilini
oching (kompyuter va telefon bir Wi-Fi'da bo'lsin). Brauzer "xavfsiz emas"
ogohlantirishida **Advanced → Proceed** ni bosing — shunda kamera ishlaydi.

Opsiyalar: `node server.js --port 3000`, `--host 127.0.0.1`, `--help`.

Node bo'lmasa, oddiy muqobil: `python3 -m http.server 8000` (faqat HTTP).

### GitHub Pages'ga joylash

1. GitHub repo → **Settings → Pages**
2. Source: `Deploy from a branch`, Branch: `main`, papka: `/ (root)`
3. Bir necha daqiqadan so'ng sayt `https://<username>.github.io/arvideo/` manzilida ochiladi.

## Qanday foydalaniladi

### Tayyor demo

1. Telefonda saytni oching → **AR Demo**.
2. [Namuna marker rasmni](https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png) kompyuter ekranida oching yoki chop eting.
3. Kamerani rasmga tuting — ustida 3D model paydo bo'ladi.

### O'z AR tajriyangizni yaratish

1. **create.html** sahifasini oching.
2. Marker bo'ladigan rasmni yuklang va **kompilyatsiya** qiling → `targets.mind` fayli yuklab olinadi.
3. `targets.mind` faylini shu repoga (masalan `targets/` papkaga) yoki istalgan HTTPS hostingga joylang.
4. Kontent (mp4 video / glb 3D model / rasm) URL'ini kiriting — fayl ham HTTPS'da, CORS ochiq bo'lishi kerak. Eng osoni: fayllarni shu repoga qo'shib GitHub Pages orqali xizmat qilish (masalan `media/video.mp4`).
5. **Havola va QR yaratish** tugmasini bosing — tayyor QR kodni chop etib marker rasm yoniga joylang.

QR kod skanerlanganida `ar.html` quyidagi parametrlar bilan ochiladi:

```
ar.html?mind=<.mind fayl URL>&type=video|model|image&src=<kontent URL>&scale=1
```

### VR rejim

```
vr.html?type=360video&src=<mp4 URL>
vr.html?type=360image&src=<jpg URL>
vr.html?type=model&src=<glb/gltf URL>&scale=1
```

Telefonda o'ng pastdagi VR tugmasi bosilsa Cardboard (ikki ko'zli) rejim yoqiladi.

## Hujjatlar

| Fayl | Mazmuni |
|---|---|
| [docs/INSTALL.md](docs/INSTALL.md) | O'rnatish, lokal sinash, GitHub Pages va boshqa hostinglarga deploy |
| [docs/USER_GUIDE.md](docs/USER_GUIDE.md) | Har bir sahifadan foydalanish, URL parametrlari, amaliy stsenariylar |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Texnik arxitektura, texnologiyalar, oqimlar, kengaytirish nuqtalari |
| [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | Marker rasm, video, 3D model va 360° kontent tayyorlash |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Muammolar va yechimlar (FAQ) |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Rivojlantirish rejasi |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Hissa qo'shish tartibi |
| [CHANGELOG.md](CHANGELOG.md) | Versiyalar tarixi |

## Maslahatlar

- **Yaxshi marker**: detallari ko'p, kontrastli, takrorlanmaydigan naqshli rasm. Bir xil rangli yoki tekis rasmlar yomon taniladi.
- **Video**: brauzer siyosati tufayli video avval ovozsiz boshlanadi; foydalanuvchi ekranga bossa ovoz yoqiladi.
- **CORS**: tashqi hostingdagi video/model fayllar `Access-Control-Allow-Origin` ruxsatiga ega bo'lishi kerak. GitHub Pages va jsDelivr'da bu avtomatik ochiq.
- **3D modellar**: `.glb` formati eng qulay. Bepul modellar: [Sketchfab](https://sketchfab.com) (CC litsenziyali).
