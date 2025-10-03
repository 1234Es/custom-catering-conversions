/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const IMG_DOMAINS = [
  'images.unsplash.com',
  'plus.unsplash.com',
];

// DEVELOPMENT CSP (looser so HMR/overlay & inline dev bits work)
const devCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // allow WebSocket + local HTTP for HMR/overlay
  "connect-src 'self' ws: http: https:",
  // images during dev
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // Tailwind/Framer often inject small inline styles in dev
  "style-src 'self' 'unsafe-inline'",
  // allow inline/eval/wasm-eval only in dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:",
].join('; ');

// PRODUCTION CSP (strict; no inline/eval; allows WASM init)
const prodCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // only your origin for fetch/websocket in prod; widen if you call external APIs
  "connect-src 'self'",
  // limit images to your hosts
  `img-src 'self' data: blob: https://${IMG_DOMAINS.join(' https://')}`,
  "font-src 'self' data:",
  // safe to allow inline styles if you rely on them (remove if you don't)
  "style-src 'self' 'unsafe-inline'",
  // strict: no inline/eval; allow wasm init so deps like secp256k1 can compile
  "script-src 'self' 'wasm-unsafe-eval'",
].join('; ');

const nextConfig = {
  // saner devtool to reduce eval-ish behavior in dev
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

export default nextConfig;
