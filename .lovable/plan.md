
## Rencana: Pemilihan Kursi Shuttle dengan Denah Mobil

### Tujuan
Mengganti halaman `/shuttle` placeholder dengan flow booking shuttle yang menampilkan **denah mobil Hiace** sebagai background, dengan **kursi-kursi interaktif** yang di-overlay di atasnya untuk dipilih user.

### Aset yang Digunakan
- Gambar denah Hiace yang Anda upload (`BASE_HIACE.png`) → akan disalin ke `src/assets/hiace-layout.png` agar ter-bundle Vite

### Alur Halaman `/shuttle`

```text
┌─────────────────────────────┐
│ ← Pilih Kursi Shuttle       │
├─────────────────────────────┤
│ Rute: Bandara → Kota        │
│ Tanggal: dropdown jadwal    │
├─────────────────────────────┤
│   ┌───────────────────┐     │
│   │  [Gambar Hiace]   │     │
│   │   ▢   ▢   ▢       │     │  ← kursi sebagai
│   │   ▢   ▢   ▢       │     │     tombol absolute
│   │   ▢   ▢   ▢       │     │     di atas gambar
│   │   ▢   ▢   ▢       │     │
│   │     ▢ ▢           │     │
│   └───────────────────┘     │
├─────────────────────────────┤
│ Legenda:                    │
│ ⬜ Tersedia ⬛ Terisi 🟦 Pilih │
├─────────────────────────────┤
│ Kursi terpilih: 3A, 4B      │
│ Total: Rp 150.000            │
│ [ Lanjut ke Pembayaran ]    │
└─────────────────────────────┘
```

### Implementasi Teknis

**1. Asset Setup**
- Copy `user-uploads://BASE_HIACE.png` → `src/assets/hiace-layout.png`
- Import sebagai ES module di komponen

**2. Data Layout Kursi (hardcoded, sesuai denah Hiace 14 seat)**
- File baru: `src/data/seatLayout.ts`
- Setiap kursi punya: `{ id, label, x%, y%, status }` (posisi dalam persen agar responsif)
- Beberapa kursi pre-set sebagai "occupied" untuk demo

**3. Komponen Baru**
- `src/components/shuttle/SeatMap.tsx` — render gambar + kursi overlay
  - Container `relative aspect-[1/2]` (proporsi gambar Hiace yang panjang)
  - Background image fit
  - Setiap kursi = `<button>` dengan `position: absolute`, `left: x%, top: y%`
  - Warna: hijau (available), merah (occupied), biru (selected)
  - Animasi tap dengan scale transition

**4. Halaman `Shuttle.tsx` (rewrite total)**
- Header sticky dengan tombol back
- Card info rute (dummy: pilihan rute & jadwal)
- Komponen `<SeatMap>` di tengah
- Sticky bottom card: ringkasan kursi dipilih + total + tombol "Lanjut"
- Tombol "Lanjut" navigate ke `/booking?type=shuttle&name=...&room=Kursi 3A,4B&price=...`
- Halaman `/booking` yang sudah ada akan menyimpan ke tabel `bookings` (sudah berfungsi)

**5. Pricing**
- Per kursi flat: Rp 75.000 (dummy, bisa diubah)
- Total = jumlah kursi terpilih × harga

### Yang TIDAK Dibuat (di luar scope)
- Real-time sync occupied seats (semua dummy untuk sekarang)
- Multiple vehicle types (hanya Hiace)
- Admin panel untuk edit layout
- Tabel `seat_layouts` di database (overkill untuk UI demo)

### Hasil Akhir
User bisa: buka `/shuttle` → lihat denah Hiace → tap kursi yang available → kursi berubah biru → tap "Lanjut" → masuk ke halaman Booking → bayar → booking tersimpan di database dengan `booking_type: 'shuttle'` dan detail kursi di `details.room`.
