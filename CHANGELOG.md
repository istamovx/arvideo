# Changelog

Barcha muhim o'zgarishlar shu faylda qayd etiladi.
Format: [Keep a Changelog](https://keepachangelog.com/), versiyalash: [SemVer](https://semver.org/).

## [1.0.0] — 2026-06-11

### Qo'shildi

- **AR ko'rish** (`ar.html`): MindAR + A-Frame asosida rasm-tracking; marker ustida video / rasm / 3D model (glTF/GLB) ko'rsatish; URL parametrlari (`mind`, `type`, `src`, `scale`, `w`, `h`) orqali to'liq sozlash; `targetFound`/`targetLost` da video avto play/pauza; bosishda ovozni yoqish.
- **QR skaner** (`scan.html`): html5-qrcode bilan kamera orqali QR o'qish va havolani avtomatik ochish.
- **AR yaratish** (`create.html`): brauzerda rasmdan `.mind` marker kompilyatsiyasi (MindAR Compiler), progress ko'rsatkichi, `targets.mind` yuklab olish, AR havola va QR kod generatsiyasi.
- **VR ko'rish** (`vr.html`): 360° video (videosphere), 360° rasm (sky) va 3D model rejimlari; Cardboard VR tugmasi; giroskop/sichqoncha boshqaruvi.
- **Bosh sahifa** (`index.html`): o'zbek tilidagi interfeys, demo marker havolasi, bo'limlarga kirish.
- **Hujjatlar**: README, INSTALL, USER_GUIDE, ARCHITECTURE, CONTENT_GUIDE, TROUBLESHOOTING, ROADMAP, CONTRIBUTING, CHANGELOG.
- `targets/` va `media/` papkalari — foydalanuvchi kontenti uchun.

### Texnik

- Sof statik ilova: build yo'q, backend yo'q; A-Frame 1.4.2, MindAR 1.2.5, html5-qrcode 2.3.8, qrcodejs 1.0.0 (CDN, versiya-pin).
