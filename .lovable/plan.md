

## Fix: Upload Denah Gagal — `mime type application/json is not supported`

### Root Cause
File `src/lib/supabase.ts` line 24-28 set **global header** `Content-Type: application/json` di Supabase client:

```ts
global: {
  headers: { 'Content-Type': 'application/json' },
},
```

Header global ini **mengoverride** `contentType` yang dipasang oleh storage upload. Akibatnya request POST ke `/storage/v1/object/vehicle-layouts/...` dikirim dengan header `Content-Type: application/json` padahal body-nya `FormData` berisi PNG. Bucket `vehicle-layouts` punya whitelist MIME (`image/png|jpeg|webp|...`) → tolak dengan `415 invalid_mime_type`.

Selain itu, project punya **dua client supabase**:
- `src/lib/supabase.ts` (yang bermasalah, dipakai di `SeatLayoutEditor.tsx`)
- `src/integrations/supabase/client.ts` (auto-generated, bersih)

`SeatLayoutEditor.tsx` import dari `@/lib/supabase` → kena bug. Sementara komponen lain yang import dari `@/integrations/supabase/client` kemungkinan baik-baik saja.

### Fix
**`src/lib/supabase.ts`** — Hapus blok `global.headers` sepenuhnya. Supabase SDK sudah otomatis set Content-Type yang benar per request type (`application/json` untuk REST, `multipart/form-data` untuk Storage upload, dll).

```ts
// HAPUS:
global: {
  headers: { 'Content-Type': 'application/json' },
},
```

Cukup itu. Tidak perlu sentuh kode upload — `contentType: file.type` sudah benar.

### Bonus (optional, recommended)
File `src/lib/supabase.ts` redundant dengan `src/integrations/supabase/client.ts`. Sebaiknya semua import diarahkan ke `@/integrations/supabase/client` (auto-generated, selalu sync dengan project). Tapi ini scope cleanup terpisah — untuk sekarang cukup hapus header global biar upload jalan.

### File yang Disentuh
- `src/lib/supabase.ts` — hapus 3 baris `global.headers`

### Hasil
Upload denah PNG/JPG/WebP ke bucket `vehicle-layouts` berhasil (status 200), `image_url` tersimpan ke tabel `vehicles`, denah tampil di editor admin & user shuttle.

