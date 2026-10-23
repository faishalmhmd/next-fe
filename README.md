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

### Penggunaan next dan typescript di pakai untuk mempermudah routing dan pages 
### penggunaan zod untuk validasi karena schema zod dibikin schme config dan interface ,, untuk mempermudah modularisasi form value
### penggunaan shadcn ui dan shadcn ui map ini karena template bawaan / config bawaan sudah ada marker edit via draw control https://shadcn-map.vercel.app/docs/examples/draw-control
### penggunaan zustand untuk state management menggunakan library ini karena hampir sama dengan penggunana nuxt store pinia dimana ada state, actions, getter & setter
