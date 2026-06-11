# Muammolarni hal qilish (FAQ)

## Kamera

### ❌ "Kamera ochilmadi" yoki ruxsat so'ralmayapti

- Sayt **HTTPS** orqali ochilganini tekshiring (`http://` da kamera ishlamaydi, faqat `localhost` istisno).
- Brauzer sozlamalarida sayt uchun kamera ruxsati bloklanmaganini tekshiring:
  - Chrome: manzil qatoridagi qulf belgisi → Site settings → Camera → Allow
  - Safari (iOS): Sozlamalar → Safari → Camera → Ask/Allow
- Boshqa ilova (Zoom, Telegram qo'ng'irog'i) kamerani band qilib turgan bo'lishi mumkin — yoping.

### ❌ iOS'da kamera qora ekran

- Faqat **Safari** ishlating — iOS'dagi Chrome/Firefox ham aslida Safari dvijokida, lekin ba'zi versiyalarda kamera API cheklangan.
- iOS 14.3+ talab qilinadi.
- Telegram/Instagram ichki brauzeridan emas, alohida Safari'da oching.

## AR tracking

### ❌ Marker tanilmayapti

1. To'g'ri `.mind` fayl ulanganini tekshiring (`mind` parametri).
2. Kompilyatsiya qilingan rasm bilan ko'rsatilayotgan rasm **aynan bir xil** bo'lishi kerak.
3. Yorug'likni yaxshilang, yaltirashni kamaytiring.
4. Masofa: 20–50 sm; marker ekranda to'liq ko'rinsin.
5. Marker sifatini tekshiring — [CONTENT_GUIDE.md](CONTENT_GUIDE.md) dagi "yaxshi marker" talablariga qarang. Detali kam rasm hech qachon yaxshi tanilmaydi.

### ❌ Kontent titraydi yoki "sakraydi"

- Bu odatda marker sifati pastligidan. Detallari ko'proq rasm ishlating.
- Telefonni sekinroq harakatlantiring.

### ❌ Model ko'rinmayapti, lekin "Marker topildi" deyapti

- Model juda katta yoki juda kichik bo'lishi mumkin — `scale` parametrini o'zgartirib ko'ring (`0.1` dan `10` gacha).
- Brauzer konsolida (Desktop'da F12) GLTF yuklash xatosini tekshiring — ko'pincha CORS yoki noto'g'ri URL.

## Video

### ❌ Video o'ynamayapti

- URL to'g'ri va fayl **MP4 (H.264)** ekanini tekshiring. HEVC/H.265 ko'p brauzerlarda ishlamaydi.
- CORS: video boshqa domenda bo'lsa `Access-Control-Allow-Origin: *` sarlavhasi kerak. Eng oson yechim — videoni shu repodagi `media/` papkaga qo'yish.
- Katta fayl sekin internetda uzoq yuklanadi — videoni siqing (< 20 MB).

### ❌ Video ovozsiz

Bu xato emas — brauzerlar avtoijroda ovozni bloklaydi. Foydalanuvchi ekranga bir marta bossa ovoz yoqiladi (ekranda shu haqda yozuv chiqadi).

## Marker kompilyatsiyasi (create.html)

### ❌ Kompilyatsiya juda uzoq / brauzer qotib qoladi

- 30–90 soniya — normal. Juda katta rasm bo'lsa (4000+ px) avval 1500 px gacha kichraytiring.
- Telefonda emas, kompyuterda kompilyatsiya qiling (tezroq).

### ❌ "Xatolik" chiqdi

- Rasm formati JPG/PNG ekanini tekshiring (HEIC ishlamaydi — JPG ga aylantiring).
- Sahifani yangilab qayta urinib ko'ring.

## QR kod

### ❌ QR skanerlanyapti, lekin sahifa ochilmayapti

- QR ichidagi URL'ni tekshiring — `create.html` da havola **deploy qilingan sayt** manzilidan yaratilgan bo'lishi kerak (lokal `localhost` havolasi telefonda ochilmaydi).
- URL juda uzun bo'lsa ba'zi eski skanerlar o'qiy olmaydi — QR'ni kattaroq chop eting.

## VR

### ❌ VR tugmasi ko'rinmayapti / ishlamayapti

- iOS Safari WebXR'ni to'liq qo'llamaydi — Cardboard rejim o'rniga oddiy giroskop ko'rinish ishlaydi (telefonni aylantirish bilan).
- Android Chrome'da VR tugmasi ekran o'ng-pastida chiqadi.

### ❌ 360° video cho'zilgan/buzilgan ko'rinadi

Video **equirectangular** (2:1, masalan 4096×2048) formatda bo'lishi kerak. Oddiy video 360° sifatida ochilmaydi.

## Umumiy diagnostika

1. Desktop Chrome'da oching → **F12 → Console** — qizil xatolarni o'qing.
2. Eng ko'p uchraydigan sabablar: noto'g'ri URL (404), CORS bloki, HTTP (HTTPS emas).
3. Demo rejim (`ar.html` parametrsiz) ishlayaptimi? Ishlasa — muammo sizning fayllaringizda; ishlamasa — muhitda (HTTPS/kamera/brauzer).
