/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const IMG_DOMAINS = [
  // add any others you use
  'images.unsplash.com',
  'plus.unsplash.com',
];

const devCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // WebSocket + local HTTP for HMR/overlay
  "connect-src 'self' ws: http: https:",
  // allow external images during dev (or restrict to specific hosts)
  `img-src 'self' data: blob: https:`,
  "font-src 'self' data:",
  // inline styles are common with Tailwind in dev
  "style-src 'self' 'unsafe-inline'",
  // HMR/overlay sometimes use inline snippets. Allow ONLY in dev.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:",
].join("; ");

const prodCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Only your origin for API/fetch in prod; widen if you call external APIs
  "connect-src 'self'",
  // External images you actually use in prod:
  `img-src 'self' data: blob: https://${IMG_DOMAINS.join(' https://')}`,
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'", // OK for inline styles; remove if you fully avoid inline styles
  // No inline or eval in prod
  "script-src 'self'",
].join("; ");

const nextConfig = {
  // Remove eval-based source maps in dev (doesn't fully avoid eval, but helps)
  webpack: (config: { devtool: string; }, { dev }: any) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  },

  // Allow Next/Image to optimize remote images (optional but recommended)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: isProd ? prodCSP : devCSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
