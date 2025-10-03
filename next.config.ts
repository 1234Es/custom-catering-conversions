/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const IMG_DOMAINS = ['images.unsplash.com', 'plus.unsplash.com'];

// Dev: looser so HMR/overlay works
const devCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "connect-src 'self' ws: http: https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:",
].join('; ');

// Prod: still safe, but allow minimal inline scripts + wasm-eval for Next
const prodCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // If you fetch external APIs in prod, add them here (e.g. https://api.example.com)
  "connect-src 'self' https:",
  // Remote images you actually use
  `img-src 'self' data: blob: https://${IMG_DOMAINS.join(' https://')}`,
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  // ↓ These two fix your white-screen CSP errors
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  // Hardening
  "object-src 'none'",
  "base-uri 'self'",
].join('; ');

const nextConfig = {
  webpack: (config: { devtool: string; }, { dev }: any) => {
    if (dev) config.devtool = 'cheap-module-source-map';
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: isProd ? prodCSP : devCSP },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
