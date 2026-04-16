

## Traveloka Clone — UI Only, PWA + Responsive Web

### Overview
Clone tampilan Traveloka dengan responsive design (otomatis menyesuaikan desktop/mobile) dan bisa di-install sebagai PWA di HP. Semua data dummy/static.

### Halaman & Fitur

**1. Homepage**
- Header/Navbar: Logo, menu navigasi (Hotel, Pesawat, Promo, Akun), search bar
- Hero banner carousel dengan promo deals
- Quick search tabs: Hotel & Pesawat
- Promo cards grid (deals terkini)
- Footer dengan links

**2. Pencarian Hotel**
- Form: Kota tujuan, tanggal check-in/out, jumlah tamu
- Hasil pencarian dengan filter (harga, rating, bintang)
- Card hotel: foto, nama, rating, harga/malam
- Detail hotel: galeri foto, fasilitas, review, pilih kamar, tombol booking

**3. Pencarian Tiket Pesawat**
- Form: Kota asal, tujuan, tanggal, penumpang, kelas
- Hasil pencarian dengan filter (maskapai, harga, waktu)
- Card penerbangan: maskapai, waktu, durasi, harga
- Detail penerbangan: info lengkap, bagasi, tombol booking

**4. Halaman Promo**
- Grid banner promo dengan kategori (Hotel, Pesawat, etc.)
- Detail promo dengan syarat & ketentuan

**5. Akun & Riwayat**
- Login/Register form (UI only, tanpa backend)
- Profil user dengan avatar
- Riwayat booking (dummy data) — list card dengan status

**6. Booking Flow (UI Only)**
- Form data penumpang/tamu
- Ringkasan booking
- Halaman konfirmasi sukses

### Design System
- **Warna utama**: Biru Traveloka (#0064D2), aksen biru muda, putih bersih, abu-abu netral
- **Font**: Inter untuk heading dan body (clean, modern)
- **Radius**: Rounded (8px-12px), shadow halus
- **Mobile**: Bottom navigation bar (Home, Hotel, Pesawat, Promo, Akun)
- **Desktop**: Top navbar horizontal

### Responsiveness
- Desktop (>1024px): Layout lebar, sidebar filter, grid 3-4 kolom
- Tablet (768-1024px): Grid 2 kolom, compact nav
- Mobile (<768px): Single column, bottom nav, swipeable carousel

### PWA Setup
- Manifest.json dengan icon dan display standalone
- Installable dari browser mobile (tanpa service worker untuk simplicity)

### Routing
- `/` — Homepage
- `/hotels` — Pencarian hotel
- `/hotels/:id` — Detail hotel
- `/flights` — Pencarian pesawat
- `/flights/:id` — Detail penerbangan
- `/promos` — Halaman promo
- `/account` — Login/Profil
- `/booking` — Booking flow
- `/booking/confirmation` — Konfirmasi

