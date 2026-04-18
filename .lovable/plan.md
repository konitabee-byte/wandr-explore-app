## Rencana: Dashboard Admin

### Tujuan

Buat area `/admin` terproteksi (hanya role `admin`) dengan layout sidebar, halaman setting, dan seat layout editor yang sudah ada dipindah ke admin.

### Arsitektur

```text
/admin                  → Dashboard (statistik)
/admin/bookings         → Daftar semua booking user
/admin/promos           → CRUD promo
/admin/seat-editor      → Seat layout editor (pindah dari /shuttle/editor)
/admin/users            → Daftar user + assign role
/admin/settings         → Pengaturan profil admin & app
```

Layout: sidebar kiri (collapsible) + topbar dengan tombol logout. Pakai shadcn Sidebar.

### Implementasi

**1. Role Guard**

- File baru `src/components/AdminRoute.tsx` — wrap children, cek `has_role(user.id, 'admin')` via Supabase. Kalau bukan admin → redirect ke `/`.
- Tambah method `isAdmin` ke `UserAuthContext.tsx` (query `user_roles` saat login).

**2. Layout & Navigasi**

- `src/components/admin/AdminSidebar.tsx` — Sidebar dengan menu: Dashboard, Bookings, Promos, Seat Editor, Users, Settings.
- `src/components/admin/AdminLayout.tsx` — `SidebarProvider` + `AdminSidebar` + `<Outlet>` topbar.

**3. Halaman Admin**

- `src/pages/admin/Dashboard.tsx` — Cards statistik: total bookings, total users, total revenue, promo aktif. Query Supabase langsung.
- `src/pages/admin/AdminBookings.tsx` — Table semua booking (admin bypass via service role tidak perlu — kita tambah RLS policy "admins can view all bookings").
- `src/pages/admin/AdminPromos.tsx` — Table promo + dialog tambah/edit/hapus. CRUD ke tabel `promos` (sudah ada policy admin).
- `src/pages/admin/AdminUsers.tsx` — List profiles + role-nya, tombol "Promote to admin" / "Demote".
- `src/pages/admin/AdminSettings.tsx` — Form edit profile admin (nama, phone, avatar) + section "App Settings" (placeholder untuk maintenance mode toggle yang disimpan di localStorage).
- Pindahkan `src/pages/SeatLayoutEditor.tsx` → tetap di tempat, tapi route lama `/shuttle/editor` dihapus dan diganti `/admin/seat-editor`. Akses dari header `/shuttle` (ikon pensil) hanya tampil jika `isAdmin`.
- Tambahkan Multi-tenant / multi-vehicle layout editor.

**4. Database Migration**
Tambah RLS policies agar admin bisa lihat data semua user:

```sql
-- bookings: admin bisa lihat semua
CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- profiles: admin bisa lihat semua
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- user_roles: admin sudah punya policy ALL, sudah cukup
```

**5. Routing (`src/App.tsx`)**

- Tambah nested route `/admin/*` dibungkus `<AdminRoute><AdminLayout /></AdminRoute>`
- Hapus route `/shuttle/editor`

**6. Cara Jadi Admin**

- Belum ada UI signup admin (security). User pertama jadi admin lewat:
  - Buka SQL Editor di backend → `INSERT INTO user_roles (user_id, role) VALUES ('<your-uuid>', 'admin');`
  - Atau saya bisa kasih tombol developer "Make me admin" di halaman Account (DEV ONLY) — tunggu konfirmasi Anda.

### Yang TIDAK Dibuat

- Edit booking detail per user (read-only dulu)
- Email notification system
- Audit log
- &nbsp;

### Hasil Akhir

Admin login → otomatis lihat menu admin → kelola promo, lihat semua booking & user, edit layout kursi, atur profile. User biasa yang coba akses `/admin/*` langsung di-redirect.

### Pertanyaan untuk Anda

1. Apakah saya tambahkan tombol "Make me admin (DEV)" sementara di halaman Account agar Anda bisa testing? Jalankan SQL manual