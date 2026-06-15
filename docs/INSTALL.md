# O'rnatish va ishga tushirish

Bu hujjat ARVideo'ni lokalda sinash va internetga joylash (deploy) bo'yicha to'liq qo'llanma.

## Talablar

- Hech qanday build vositasi, Node.js yoki server kerak **emas** — loyiha sof statik HTML/CSS/JS.
- Barcha kutubxonalar (A-Frame, MindAR, html5-qrcode, qrcodejs) CDN orqali yuklanadi, shuning uchun foydalanuvchi qurilmasida internet bo'lishi kerak.
- Kamera ishlashi uchun sayt **HTTPS** (yoki `localhost`) orqali ochilishi shart — bu brauzer xavfsizlik talabi.

## 1. Lokalda sinash

Repo bilan birga keladigan dev server (Node.js, tashqi paketsiz):

```bash
npm start          # http://localhost:8000
# yoki: node server.js
```

So'ng brauzerda `http://localhost:8000` ni oching. `localhost` xavfsiz kontekst
hisoblanadi, kamera ishlaydi.

Muqobil statik serverlar ham yaraydi: `python3 -m http.server 8000` yoki `npx serve .`.

### Telefonda (LAN) sinash — HTTPS

`localhost` faqat shu kompyuterda ishlaydi. Telefonda kamerani sinash uchun
HTTPS kerak — server o'z-o'zidan sertifikat yaratadi:

```bash
npm run https      # yoki: node server.js --https
```

Terminalda chiqgan `https://<kompyuter-IP>:8000` manzilini telefon brauzerida
oching (ikkala qurilma bir Wi-Fi'da). "Xavfsiz emas" ogohlantirishida
**Advanced → Proceed** ni bosing. Muqobil — `ngrok http 8000` bilan vaqtinchalik
HTTPS tunnel.

Server opsiyalari: `--port <n>`, `--host <addr>`, `--https`, `--help`.

## 2. GitHub Pages'ga joylash (tavsiya etiladi)

1. Kodni `main` branchga joylang.
2. GitHub'da repo → **Settings → Pages**.
3. **Source**: `Deploy from a branch`, **Branch**: `main`, papka: `/ (root)` → **Save**.
4. 1–2 daqiqadan so'ng sayt quyidagi manzilda ochiladi:

```
https://<username>.github.io/arvideo/
```

GitHub Pages avtomatik HTTPS beradi va fayllar uchun CORS ochiq — video/model/marker fayllarni shu repoda saqlash eng oson yo'l.

## 3. Boshqa hostinglar

| Hosting | Izoh |
|---|---|
| **Netlify** | Repo'ni ulang yoki papkani drag-drop qiling. Avto HTTPS. |
| **Vercel** | `vercel` CLI yoki repo ulash. Avto HTTPS. |
| **Cloudflare Pages** | Repo ulash. Avto HTTPS, tez CDN. |
| **O'z serveringiz** | nginx/apache bilan statik fayllar. SSL sertifikat (Let's Encrypt) majburiy. |

## 4. O'z kontentingizni joylashtirish

Loyihada ikkita papka tayyorlab qo'yilgan:

- `targets/` — kompilyatsiya qilingan `.mind` marker fayllari uchun
- `media/` — video (`.mp4`), 3D model (`.glb`), rasm fayllari uchun

Fayllarni shu papkalarga qo'shib push qilsangiz, ular sayt bilan birga xizmat qilinadi:

```
https://<username>.github.io/arvideo/targets/mahsulot1.mind
https://<username>.github.io/arvideo/media/video1.mp4
```

> **Eslatma:** GitHub bitta fayl uchun 100 MB chegara qo'yadi, repo uchun ~1 GB tavsiya etiladi. Katta videolarni siqing (H.264, 720p odatda yetarli) yoki tashqi CDN'da saqlang.

## 5. Tekshirish ro'yxati

- [ ] Sayt HTTPS orqali ochilyaptimi?
- [ ] `index.html` → AR Demo → kamera ruxsati so'ralyaptimi?
- [ ] Namuna marker rasm bilan 3D model chiqyaptimi?
- [ ] QR skaner kamera ochyaptimi?
- [ ] `create.html` da rasm kompilyatsiya bo'lyaptimi (bir necha o'n soniya kutish normal)?
