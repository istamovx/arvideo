# Roadmap — rivojlantirish rejasi

## ✅ v1.0 (joriy holat)

- [x] Rasm-tracking AR: marker ustida video / rasm / 3D model (MindAR + A-Frame)
- [x] QR skaner sahifasi va QR kod generatsiyasi
- [x] Brauzerda `.mind` marker kompilyatsiyasi (create.html)
- [x] VR rejim: 360° video, 360° rasm, 3D model (Cardboard qo'llab-quvvatlash)
- [x] O'zbek tilidagi interfeys va to'liq hujjatlar
- [x] Serverless arxitektura — GitHub Pages'da bepul ishlaydi

## 🔜 v1.1 — qulaylik

- [ ] `create.html` da `.mind` faylni avtomatik nomlash va bir nechta marker qo'llash
- [ ] QR kodni PNG sifatida yuklab olish tugmasi
- [ ] AR sahifada screenshot olish tugmasi
- [ ] Til tanlash (uz / ru / en)
- [ ] PWA: offline kesh, "Bosh ekranga qo'shish"

## 🔜 v1.2 — kontent boshqaruvi

- [ ] `gallery.html` — repoda mavjud barcha AR tajribalar ro'yxati (JSON manifest asosida)
- [ ] Bitta `.mind` faylda ko'p marker + har biriga alohida kontent (`targetIndex`)
- [ ] Video uchun play/pause/qayta boshlash tugmalari AR sahnada
- [ ] 3D model uchun barmoq bilan aylantirish/kattalashtirish (gesture controls)

## 🔮 v2.0 — yangi AR turlari

- [ ] **Markersiz AR** (WebXR plane detection) — kontentni polga/stolga joylash
- [ ] **Lokatsion AR** (GPS) — joyga bog'langan kontent (turizm uchun)
- [ ] **Yuz tracking** (MindAR face) — virtual primerka
- [ ] Bir nechta foydalanuvchi bir sahnani ko'rishi (shared AR)

## 🔮 Backend varianti (ehtiyoj bo'lsa)

Hozirgi arxitektura ataylab serverless. Agar kontent hajmi o'ssa:

- [ ] Object storage (Cloudflare R2 / S3) — katta video/modellar uchun
- [ ] Oddiy admin panel — kontent yuklash, QR avtomatik yaratish
- [ ] Statistika: QR skanerlashlar soni, marker topilish foizi

## Hissa qo'shish

Taklif va xatolar uchun GitHub Issues oching. Pull request'lar [CONTRIBUTING.md](../CONTRIBUTING.md) bo'yicha qabul qilinadi.
