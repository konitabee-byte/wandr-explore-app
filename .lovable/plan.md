

## Review & Fix: Konsistensi Tampilan Editor Admin ↔ Shuttle User

### Issues Ditemukan

**1. 🔴 BUG CRITICAL — Initial seats dari localStorage di mode vehicle**
`SeatLayoutEditor.tsx` line 37: `useState(() => getStoredSeats())` membaca seats dari localStorage. Saat admin buka editor untuk vehicle baru:
- Awalnya tampil seats DARI vehicle LAIN (yang tersimpan di localStorage)
- Kalau DB layout kosong (`length === 0`), kondisi `if (layout.length > 0)` tidak jalan → seats lokal tetap terpakai
- Admin geser → klik "Simpan ke Database" → vehicle baru disimpan dengan layout milik vehicle lain ❌

→ **Fix**: Di mode vehicle (`vehicleId` ada), initial state `[]` dan selalu set dari DB (termasuk array kosong).

**2. 🟡 Visual jump saat image load (admin & user)**
Saat pertama render, `aspectRatio` masih null → container pakai fallback `aspect-[1/2]`. Setelah `<img onLoad>`, aspect berubah → posisi visual kursi "loncat" karena container resize. UX tidak smooth.

→ **Fix**: Tampilkan skeleton/blank container sampai image loaded jika `baseImageUrl` ada. Render kursi setelah aspect ready.

**3. 🟡 Reset di mode vehicle tidak persisten**
`handleReset` dengan `vehicleId` set `seats=[]` tapi tidak save ke DB. User di /shuttle masih lihat layout lama sampai admin klik "Simpan ke Database". Kalau admin lupa simpan → state inkonsisten.

→ **Fix**: Tambah konfirmasi message yang lebih jelas: "Reset kursi (jangan lupa Simpan ke Database)".

**4. 🟡 Reload setelah upload denah tidak refetch layout**
Setelah upload denah, hanya `imageUrl` yang di-update di state. Layout di DB tidak berubah, OK. Tapi kalau aspect ratio image baru beda jauh dari sebelumnya, posisi kursi yang lama bisa tidak match dengan denah baru.

→ **Catatan**: Tidak fix otomatis — beri warning toast: "Periksa posisi kursi setelah upload denah baru."

**5. 🟢 Konfirmasi konsistensi visual (sudah OK)**
- Container: `max-w-[320px] mx-auto rounded-2xl bg-muted/30 border` ✅ identik
- Image: `object-contain pointer-events-none select-none` ✅ identik
- Aspect: dynamic dari `naturalWidth/naturalHeight` ✅ identik
- Kursi: `w-9 h-9 rounded-lg border-2 text-[10px] font-bold` ✅ identik
- Posisi: `left/top` % + `-translate-x-1/2 -translate-y-1/2` ✅ identik

→ Tampilan akan **persis sama** antara editor dan user, ASAL bug #1 di atas tidak terjadi.

### Yang Akan Diubah

**`src/pages/SeatLayoutEditor.tsx`**
- Initial state: `useState<Seat[]>(vehicleId ? [] : getStoredSeats())`
- `useEffect` load DB: hapus kondisi `if (layout.length > 0)` — selalu set `setSeats(layout)` (boleh kosong)
- `handleFileSelected`: setelah sukses upload, tambah toast warning "Periksa kembali posisi kursi terhadap denah baru"
- `handleReset` (mode vehicle): ubah pesan konfirmasi dan toast jadi "Layout direset — klik Simpan ke Database untuk menerapkan"

**`src/components/shuttle/SeatEditor.tsx` & `SeatMap.tsx`**
- Tambah state `imgLoaded` di kedua file
- Saat `baseImageUrl` ada tapi `imgLoaded=false`: tampilkan skeleton/dim overlay supaya tidak ada visual jump
- Render kursi tetap tampil (posisi % stabil), tapi container pakai `min-h-[400px]` placeholder sampai image ready

### File yang Disentuh
- `src/pages/SeatLayoutEditor.tsx` — fix bug initial state + toast warning
- `src/components/shuttle/SeatEditor.tsx` — smooth image load
- `src/components/shuttle/SeatMap.tsx` — smooth image load (sama)

### Hasil
- Admin buka editor vehicle X → layout vehicle X, bukan localStorage milik vehicle lain
- Tampilan editor admin **persis sama** dengan tampilan user di /shuttle (aspect, posisi, ukuran kursi)
- Image load smooth tanpa visual jump
- Admin paham reset & upload denah baru perlu klik Simpan ke Database

