import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@noor/types'],
  // Allow opening the app via http://127.0.0.1:3000 and LAN IPs (phone
  // testing). Next.js 16 blocks dev resources from hosts not listed here.
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.0.128'],
}

export default nextConfig