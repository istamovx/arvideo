# Hissa qo'shish qo'llanmasi

ARVideo'ga hissa qo'shmoqchi bo'lganingiz uchun rahmat!

## Ishni boshlash

```bash
git clone https://github.com/istamovx/arvideo.git
cd arvideo
python3 -m http.server 8000
# brauzerda: http://localhost:8000
```

Build bosqichi yo'q — fayllarni tahrirlang va sahifani yangilang.

## Loyiha tamoyillari

1. **Build vositasiz** — sof HTML/CSS/JS, kutubxonalar CDN'dan versiya-pin bilan. Yangi framework yoki bundler qo'shmang.
2. **Serverless** — backend talab qiladigan funksiya ixtiyoriy (optional) bo'lishi kerak.
3. **Telefon birinchi** — har bir o'zgarishni kamida bitta haqiqiy telefonda (Android Chrome yoki iOS Safari) sinang.
4. **O'zbek tili** — interfeys matnlari o'zbekcha; kod va commit xabarlari uchun ingliz/o'zbek tilidan foydalanish mumkin.

## O'zgarish kiritish tartibi

1. Fork qiling yoki yangi branch oching: `git checkout -b feature/nomi`
2. O'zgarish kiriting. Kod uslubi: mavjud fayllardagi uslubga ergashing (2 probel indent, oddiy vanilla JS).
3. Sinab ko'ring:
   - [ ] `index.html` — barcha havolalar ishlaydi
   - [ ] `ar.html` — demo rejim (parametrsiz) marker bilan ishlaydi
   - [ ] `scan.html` — QR skanerlanadi
   - [ ] `create.html` — rasm kompilyatsiya bo'ladi, QR yaratiladi
   - [ ] `vr.html` — uchala `type` ham ochiladi
   - [ ] Telefonda sinaldi (qaysi qurilma — PR'da yozing)
4. Commit: qisqa, mazmunli xabar (masalan, `ar.html: video uchun pause tugmasi qo'shildi`).
5. Pull request oching va quyidagilarni yozing:
   - Nima o'zgardi va nima uchun
   - Qaysi qurilma/brauzerlarda sinaldi
   - UI o'zgargan bo'lsa — skrinshot

## Xato (bug) haqida xabar berish

GitHub Issues'da quyidagilarni ko'rsating:

- Qurilma va brauzer (masalan: Samsung A52, Chrome 120)
- Sahifa va URL parametrlari
- Kutilgan va haqiqiy natija
- Brauzer konsolidagi xatolar (iloji bo'lsa skrinshot)

Ko'p uchraydigan muammolar avval [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) da tekshirilsin.

## Yangi funksiya taklif qilish

Katta o'zgarishdan oldin Issue oching va muhokama qiling — [docs/ROADMAP.md](docs/ROADMAP.md) bilan mosligini tekshiring.
