/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react'],
  },
}

export default nextConfig
