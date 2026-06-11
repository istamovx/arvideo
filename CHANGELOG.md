# Changelog

Barcha muhim o'zgarishlar shu faylda qayd etiladi.
Format: [Keep a Changelog](https://keepachangelog.com/), versiyalash: [SemVer](https://semver.org/).

## [2.0.0] — 2026-06-11

### O'zgartirildi

- **Yangi dizayn tizimi**: butun interfeys Figma'dagi Untitled UI (Blue) dizayni asosida qayta qurildi — Inter shrifti, oq sidebar'li dashboard layout, Untitled UI rang tokenlari (gray/blue/success/error), radius va shadow shkalasi.
- `index.html` — dashboard ko'rinishi: sidebar navigatsiya, sarlavha paneli, feature kartalar, bosqichlar (steps).
- `create.html` — yangi komponentlar bilan: drag-drop file upload, custom select, badge holatlar, alert'lar.
- `scan.html`, `ar.html`, `vr.html` — yangi uslubga moslandi (overlay, start-screen, tugmalar).
- Mobil: yashirin sidebar (hamburger menyu + scrim), responsive layout.

### Qo'shildi

- `components.html` — UI komponentlar ko'rgazmasi: Button (4 variant, 3 o'lcham, button-group), Input (ikonkali, error, disabled), Textarea, custom Select, Dropdown menyu, Checkbox, Radio, Toggle, Calendar (inline) va Datepicker (popover), Badge, Alert, Progress, File upload.
- `css/style.css` — to'liq dizayn tizimi (CSS tokenlar + komponentlar).
- `js/ui.js` — kutubxonasiz interaktiv komponentlar (select, dropdown, kalendar, datepicker, file-drop, mobil menyu).
- `js/shell.js` — barcha sahifalar uchun umumiy sidebar/topbar qobig'i.

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
