# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

## Build and publish Docker image locally

The browser calls the backend directly, so configure `NEXT_PUBLIC_API_URL` to
an address reachable by the user's browser. For a local browser and a backend
running on the same host, use:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 \
  --tag faishalmhmd/next-fe:stage \
  .
```

Because this is a cross-origin request, the backend must allow the frontend
origin (for example `http://localhost:3000`) and the required methods/headers
through its CORS configuration. CORS cannot be enabled by adding a request
header in the browser.

Run it locally with:

```bash
docker run --rm -p 3000:3000 faishalmhmd/next-fe:stage
```

To publish it manually, log in with `docker login` and run
`docker push faishalmhmd/next-fe:stage`.
