# Production Audit — ARVideo

> Sana: 2026-06-15 · Holat: **Prototip → Production yo'l xaritasi**
>
> Bu hujjat loyihaning joriy holatini auditdan o'tkazadi va to'liq mahsulot
> (AR/VR platforma + obuna tizimi) uchun bajarilishi kerak bo'lgan ishlar
> ro'yxatini beradi. Maqsad: foydalanuvchi profili, admin paneli va Free/Pro/
> Business obunalari bilan ishlaydigan platforma.

---

## 1. Joriy holat (qisqacha)

| Qism | Holat |
|---|---|
| AR/VR klient (ar, vr, scan, create) | ✅ Ishlaydi — MindAR + A-Frame, CDN orqali, build talab qilmaydi |
| Dizayn tizimi (Untitled UI) | ✅ Mukammal — `css/style.css`, `js/ui.js`, komponentlar |
| Landing / Profile / Admin sahifalar | ⚠️ **Faqat visual mockup** — qattiq kodlangan ma'lumot, real funksiya yo'q |
| Backend / API | ❌ Yo'q |
| Autentifikatsiya | ❌ Yo'q |
| Ma'lumotlar bazasi | ❌ Yo'q |
| To'lov / obuna | ❌ Yo'q (faqat narx ko'rinishi) |
| Kontent saqlash (upload) | ❌ Yo'q — foydalanuvchi `.mind`/media'ni qo'lda tashqi hostingga joylaydi |
| CI/CD, testlar, monitoring | ❌ Yo'q |

**Xulosa:** front-end prototip kuchli, lekin "platforma" bo'lishi uchun zarur
bo'lgan backend, auth, ma'lumotlar bazasi, to'lov va kontent quvuri (pipeline)
hali mavjud emas. Quyida bularning hammasi bosqichma-bosqich keltirilgan.

---

## 2. Topilgan kamchiliklar (audit)

### 2.1 Arxitektura va backend  🔴 Kritik
- [ ] Backend yo'q — profil va admin ma'lumotlari `profile.html`/`admin.html` ichida qattiq kodlangan.
- [ ] API qatlami yo'q (REST yoki GraphQL).
- [ ] Ma'lumotlar bazasi yo'q (foydalanuvchilar, loyihalar, obunalar, skaner loglari).
- [ ] Holat (state) saqlanmaydi — yaratilgan AR tajribalar hech qayerda saqlanmaydi (faqat URL'da parametr sifatida).

### 2.2 Autentifikatsiya va avtorizatsiya  🔴 Kritik
- [ ] Login / Register / Parolni tiklash sahifalari yo'q.
- [ ] Sessiya / token (JWT yoki cookie-session) yo'q.
- [ ] **`admin.html` hammaga ochiq** — rol asosidagi cheklov (RBAC) yo'q.
- [ ] OAuth (Google bilan kirish) yo'q.
- [ ] Email tasdiqlash, 2FA yo'q.

### 2.3 To'lov va obuna  🔴 Kritik
- [ ] To'lov provayderi integratsiyasi yo'q. O'zbekiston uchun: **Payme, Click, Uzum**; xalqaro: Stripe/Paddle.
- [ ] Obuna rejasini kuzatish va **limitlarni majburlash** yo'q (Free = 3 loyiha / 1k skaner va h.k.).
- [ ] Webhook'lar yo'q (to'lov muvaffaqiyati/bekor qilinishi, obuna yangilanishi).
- [ ] Hisob-faktura (invoice), to'lovlar tarixi yo'q.
- [ ] Reja oshirish/tushirish (upgrade/downgrade) va prorating mantiqi yo'q.

### 2.4 Kontent quvuri (AR/VR)  🟠 Muhim
- [ ] Fayl yuklash (upload) yo'q — foydalanuvchi `.mind` va media'ni qo'lda GitHub Pages/jsDelivr'ga joylashga majbur. Bu UX uchun jiddiy to'siq.
- [ ] Object storage yo'q (S3 / Cloudflare R2) — video/3D modellar uchun.
- [ ] CDN yetkazib berish va transcoding (video optimizatsiyasi) yo'q.
- [ ] Bitta marker cheklovi — `.mind` da ko'p marker qo'llab-quvvatlanmaydi.
- [ ] Loyiha CRUD yo'q (yaratish/tahrirlash/o'chirish/ro'yxat) — `profile.html` jadvali soxta.

### 2.5 Analitika  🟠 Muhim
- [ ] Skaner sonini kuzatish yo'q — profil/admin'dagi raqamlar soxta.
- [ ] Hodisa loglari yo'q (qaysi QR, qachon, qaysi qurilma/joylashuv).
- [ ] Dashboard grafiklari real ma'lumotga ulanmagan.

### 2.6 Xavfsizlik  🔴 Kritik
- [ ] **`server.js` faqat dev uchun** — prod uchun emas (rate-limit yo'q, klaster yo'q, o'z-o'zidan sertifikat). Prod'da Nginx/Caddy yoki hosting platformasi kerak.
- [ ] CDN skriptlari **SRI (Subresource Integrity) siz** yuklanadi — ta'minot zanjiri (supply-chain) xavfi.
- [ ] Xavfsizlik sarlavhalari yo'q: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- [ ] `scan.html` skanerlangan **istalgan URL'ga yo'naltiradi** — ochiq redirect / fishing xavfi. Domen allowlist kerak.
- [ ] `ar.html`/`vr.html` URL parametrlarini (`mind`, `src`) DOM'ga kiritadi — kirish validatsiyasi/allowlist kerak.
- [ ] `create.html` da `alert()` ishlatiladi va kiritma validatsiyasi yengil.
- [ ] CORS siyosati keng (`Access-Control-Allow-Origin: *`) — prod'da cheklash kerak.
- [ ] Maxfiylik: kamera ruxsati va ma'lumot yig'ish bo'yicha foydalanuvchini ogohlantirish yetarli emas.

### 2.7 Frontend / UX  🟡 O'rtacha
- [ ] Auth oqimlari (login/register/forgot) UI yo'q.
- [ ] Profil/Admin tablari bosilmaydi — interaktiv emas (statik).
- [ ] Real ma'lumot uchun loading / empty / error holatlari yo'q.
- [ ] Forma validatsiyasi tizimi yo'q.
- [ ] i18n yo'q — faqat o'zbekcha; narxlar faqat so'mda. (Roadmap'da uz/ru/en rejalashtirilgan.)
- [ ] Toast/notification tizimi yo'q (xatolik/muvaffaqiyat uchun).
- [ ] Accessibility auditi kerak (ARIA, fokus boshqaruvi, kontrast, klaviatura navigatsiyasi).

### 2.8 SEO / Meta / PWA  🟡 O'rtacha
- [ ] Favicon yo'q.
- [ ] Open Graph / Twitter Card meta teglari yo'q (faqat `landing.html` da `description` bor).
- [ ] `robots.txt`, `sitemap.xml` yo'q.
- [ ] PWA manifest va service worker yo'q (Roadmap'da rejalashtirilgan).

### 2.9 DevOps / Infratuzilma  🟠 Muhim
- [ ] CI/CD yo'q (`.github/workflows` mavjud emas).
- [ ] Avtomatlashtirilgan testlar yo'q (unit, e2e).
- [ ] Linter / formatter konfiguratsiyasi yo'q (ESLint, Prettier, Stylelint).
- [ ] `.gitignore` yo'q — `node_modules`, `.env` kabilar tasodifan commit bo'lishi mumkin.
- [ ] `LICENSE` fayli yo'q — `README`/`package.json` MIT deydi, lekin fayl yo'q.
- [ ] Xatolik monitoringi yo'q (Sentry kabi).
- [ ] Muhit konfiguratsiyasi (`.env`, secrets management) yo'q.
- [ ] Prod hosting/CDN strategiyasi aniqlanmagan.

### 2.10 Huquqiy / Muvofiqlik  🟡 O'rtacha
- [ ] Maxfiylik siyosati va Foydalanish shartlari sahifalari yo'q (`landing.html` footer'ida havola bor, sahifa yo'q).
- [ ] Shaxsiy ma'lumotlarni qayta ishlash (hisob ochilganda) bo'yicha siyosat yo'q.
- [ ] Cookie roziligi (kerak bo'lsa) yo'q.

---

## 3. Production yo'l xaritasi (bosqichlar)

### 1-bosqich — Asos (backend + auth) 🔴
- [ ] Texnologiya tanlash: backend (Node/Express yoki Next.js full-stack), DB (PostgreSQL), ORM (Prisma).
- [ ] Ma'lumotlar bazasi sxemasi: `users`, `projects`, `subscriptions`, `scan_events`, `payments`.
- [ ] Auth: ro'yxatdan o'tish, login, sessiya/JWT, email tasdiqlash, parolni tiklash.
- [ ] OAuth (Google) — ixtiyoriy lekin tavsiya etiladi.
- [ ] RBAC: `user` va `admin` rollari; `admin.html` ni himoyalash.
- [ ] Auth UI sahifalari (login/register/forgot) — mavjud dizayn tizimida.

### 2-bosqich — Kontent quvuri 🟠
- [ ] Object storage (Cloudflare R2 / S3) + imzolangan URL'lar.
- [ ] `create.html` ga to'g'ridan-to'g'ri upload (`.mind`, video, model, rasm) — qo'lda hosting o'rniga.
- [ ] Loyiha CRUD API + `profile.html` ni real ma'lumotga ulash.
- [ ] Video transcoding/optimizatsiya (ixtiyoriy).

### 3-bosqich — To'lov va obuna 🔴
- [ ] To'lov provayderi: **Payme / Click / Uzum** (UZ) integratsiyasi.
- [ ] Obuna mantiqi: rejani saqlash, webhook'lar, yangilash/bekor qilish.
- [ ] **Limitlarni majburlash**: loyiha soni va oylik skaner cheklovi reja bo'yicha.
- [ ] Hisob-faktura va to'lovlar tarixi UI.

### 4-bosqich — Analitika 🟠
- [ ] Skaner hodisalarini yozish (har bir AR ochilishida).
- [ ] Profil/Admin dashboard'larini real ma'lumotga ulash.
- [ ] Grafiklar (vaqt bo'yicha skanerlar, qurilma, joylashuv).

### 5-bosqich — Xavfsizlik va ishlab chiqarishga tayyorlik 🔴
- [ ] Reverse proxy (Nginx/Caddy) yoki PaaS; HTTPS sertifikat (Let's Encrypt).
- [ ] Xavfsizlik sarlavhalari (CSP, HSTS va h.k.) va CDN skriptlariga SRI.
- [ ] `scan.html` uchun domen allowlist; URL parametr validatsiyasi.
- [ ] Rate limiting, kirish validatsiyasi, CORS cheklovi.
- [ ] Sentry monitoring, log yig'ish.

### 6-bosqich — Sayqal va ishga tushirish 🟡
- [ ] CI/CD (`.github/workflows`): lint + test + deploy.
- [ ] Testlar (unit + e2e: Playwright).
- [ ] `.gitignore`, `LICENSE`, ESLint/Prettier.
- [ ] PWA (manifest + service worker), favicon, OG meta, `robots.txt`/`sitemap.xml`.
- [ ] i18n (uz/ru/en).
- [ ] Maxfiylik siyosati va Shartlar sahifalari.
- [ ] Toast/notification tizimi, forma validatsiyasi, loading/empty/error holatlari.

---

## 4. Tezkor g'alabalar (kichik, lekin foydali)

Backendsiz ham hoziroq qilinadigan ishlar:
- [x] `.gitignore` va `LICENSE` qo'shish.
- [x] Favicon (barcha sahifalar) va OG meta teglari (index, landing).
- [ ] `scan.html` ga domen allowlist (xavfsizlik).
- [ ] CDN skriptlariga SRI hash'lar.
- [x] `create.html` da `alert()` o'rniga toast (`window.toast`).
- [x] Profil/Admin tablarini interaktiv qilish (faqat front-end, panellar bilan).
- [ ] ESLint/Prettier va oddiy CI (lint) qo'shish.

---

## 5. Tavsiya etilgan texnologiyalar

| Soha | Tavsiya |
|---|---|
| Full-stack | Next.js (App Router) yoki Express + alohida front |
| Ma'lumotlar bazasi | PostgreSQL + Prisma |
| Auth | Auth.js (NextAuth) yoki Lucia |
| Object storage | Cloudflare R2 yoki AWS S3 |
| To'lov | Payme / Click / Uzum (UZ); Stripe (xalqaro) |
| Hosting | Vercel / Railway / VPS + Caddy |
| Monitoring | Sentry |
| Testlar | Vitest + Playwright |

> AR/VR klient (MindAR + A-Frame) mustaqil ravishda ishlaydi va shu holicha
> platformaga integratsiya qilinadi — uni qayta yozish shart emas.
