import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!configuredApiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured.")
    }
    const apiUrl = configuredApiUrl.replace(/\/+$/, "")

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
