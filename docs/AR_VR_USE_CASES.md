# AR/VR qo'llanish sohalari — ARVideo uchun saralangan ro'yxat

> Manba: "AR va VR: dunyoni o'zgartirayotgan immersiv texnologiyalar" maqolasi.
> Bu yerda **faqat ARVideo'ga (WebAR/WebVR) tegishli** qismlar tanlab olingan —
> marketing matni, landing bo'limlari va `create` sehrgaridagi shablonlar uchun.

## ARVideo nima qila oladi (qamrov)

ARVideo — **brauzerda**, ilovasiz ishlaydigan platforma. Demak maqoladagi
hamma narsa emas, balki web texnologiyasiga mos qismlar bizники:

| Texnologiya | ARVideo | Izoh |
|---|---|---|
| Rasm-tracking AR (marker ustida video/rasm/3D) | ✅ Bor | Asosiy imkoniyat |
| QR kod / Bar kod trigger | ✅ Bor / 🔶 barcode keyin | QR tayyor |
| 360° video / 360° rasm / 3D model (VR) | ✅ Bor | Cardboard bilan |
| Markersiz (SLAM) AR — polga qo'yish | 🔶 Kelajak | WebXR |
| Lokatsion (GPS) AR | 🔶 Kelajak | — |
| Yuz tracking (filtr/primerka) | 🔶 Kelajak | MindAR Face |
| Headset VR (Oculus/Vive) | ❌ Qamrovdan tashqari | Bizники web |
| AR ko'zoynaklar (HoloLens) | ❌ Qamrovdan tashqari | — |
| Aralash reallik (MR) | ❌ Qamrovdan tashqari | — |

## Bizga mos sohalar (landingdagi "Sohalar" bo'limi)

Maqoladagi sohalardan ARVideo bevosita xizmat qiladiganlari:

1. **Chakana savdo / e-commerce** — mahsulotni 3D'da ko'rish, virtual sinash, vizualizatsiya (IKEA, Sephora misollari). → kontent: 3D model / video.
2. **Ta'lim** — kitob/marker → 3D model; interaktiv darslar. → marker AR + 3D.
3. **Ko'chmas mulk** — 360° virtual turlar. → VR 360°.
4. **Marketing / reklama** — plakat/banner/qadoq ustida jonli video. → marker AR + video.
5. **Restoran / menyu** — AR menyu, taom video/3D. → QR + video/3D.
6. **Turizm / tadbirlar** — diqqatga sazovor joy yoki taklifnoma ustida AR. → marker AR + video.
7. **Tashrif qog'ozi** — vizitka skanerlanganda video tanishtiruv. → marker AR + video.

> Sog'liqni saqlash va avtomobilsozlikdagi misollar (jarrohlik AR ko'zoynagi,
> old oyna displeyi, VR simulyator) ARVideo qamrovidan tashqarida — ular maxsus
> qurilma talab qiladi. Marketing'da "tibbiyot/avto ta'lim kontenti" sifatida
> eslatish mumkin, lekin asosiy fokus yuqoridagi 7 ta soha.

## Marketing matni uchun foydali tushunchalar

- **Immersiv** — jarayonga to'liq "sho'ng'ish". (landing/About uchun yaxshi so'z)
- **AR = real dunyo + raqamli qatlam**; **VR = to'liq virtual olam**. (sodda tushuntirish)
- Tanish misollar (ishonch uchun): **Pokémon GO** (AR), **IKEA Place** (AR), **Sephora** (virtual pardoz), **Google Earth VR**, **Tilt Brush**.

## Raqobat ustunligimiz (maqoladagi muammolarga javob)

Maqolada sanalgan AR/VR muammolari — ARVideo aynan ularni yengadi:

| Muammo (maqola) | ARVideo yechimi |
|---|---|
| Qurilma qimmat (Oculus, AR ko'zoynak) | Faqat **smartfon** kerak — qo'shimcha qurilmasiz |
| Ilova o'rnatish/murakkablik | **Ilovasiz**, brauzerda QR orqali ochiladi |
| Kontent yaratish maxsus ko'nikma talab qiladi | **Kodsiz** sehrgar — rasm yukla, QR ol |

Bu uchta nuqta — landing va sotuvdagi asosiy xabarlarimiz.

## Amalga oshirish bog'liqligi

- [x] Landing "Sohalar" bo'limi (7 ta soha) qo'shildi.
- [x] Ustunliklar (ilovasiz / arzon / kodsiz) hero va ticker'da aks etgan.
- [ ] `create` sehrgariga **soha shablonlari** (menyu, vizitka, ko'chmas mulk va h.k.) qo'shish — tezroq boshlash uchun.
- [ ] Bar kod trigger va Yuz tracking — kelajak bosqichlar.
