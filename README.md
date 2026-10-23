## Run Project Via Node js pnpm dengan syntax

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). For a production run,
execute `pnpm build` followed by `pnpm start`.

## Run dengan docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080/api \
  --tag faishalmhmd/next-fe:stage \
  .
```
Stack  yang dipakai
- Next
- Typescript
- Zod
- Shadcn ui Map
- Zustand

- Penggunaan next dan typescript di pakai untuk mempermudah routing dan pages 
- penggunaan zod untuk validasi karena schema zod dibikin schme config dan interface ,, untuk mempermudah modularisasi form value
- penggunaan shadcn ui dan shadcn ui map ini karena template bawaan / config bawaan sudah ada marker edit via draw control https://shadcn-map.vercel.app/docs/examples/draw-control
- penggunaan zustand untuk state management menggunakan library ini karena hampir sama dengan penggunana nuxt store pinia dimana ada state, actions, getter & setter

## Penggunaan AI dalam pengembangan

AI digunakan sebagai asisten untuk membantu mengembangkan dan merapikan fitur
device. Arah arsitektur dan kebutuhan fitur ditentukan terlebih dahulu, lalu AI
diminta menerapkan perubahan dengan tanggung jawab kode yang terpisah:

- `interface/` untuk tipe data device dan form.
- `lib/` untuk schema validasi Zod dan parsing response API.
- `config/` untuk opsi form dan nilai default.
- `services/` untuk request API.
- `hooks/use-markers` untuk state serta operasi device.
- Zustand hanya untuk state bersama, seperti `selectedDeviceId`; daftar device
  tetap diambil melalui service dan dikelola oleh hook.

Rangkuman instruksi yang digunakan untuk AI prompt saya untuk project ini:

> Rapikan fitur pengelolaan device dengan memisahkan interface, schema Zod,
> config/default value, service API, dan custom hook `useMarkers`. Jangan campur
> validasi, konfigurasi, request API, dan state dalam satu file. Ambil daftar
> device dari `GET /devices`, gunakan response backend sebagai sumber data, dan
> pertahankan konsistensi form, peta, serta tabel. Zustand hanya untuk state
> bersama seperti `selectedDeviceId`. Periksa semua pemakaian yang terdampak,
> jalankan formatter, lint, serta typecheck/build, lalu laporkan hasil validasi
> dan hal yang belum teruji.

Setelah AI membuat perubahan, hasilnya tetap ditinjau dan divalidasi. AI
membantu implementasi; keputusan kebutuhan, arsitektur, dan penerimaan hasil
tetap dilakukan oleh pengembang.


penggunaan struktur project ini pake clean / modular
- hook / composable
- config 
- schema
- interfaces
- services
- store