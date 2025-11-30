import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // SVGR opcional: sólo si está instalado
    try {
      const svgrPath = require.resolve('@svgr/webpack');
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [svgrPath],
      });
    } catch (e) {
      // Si @svgr/webpack no está instalado, omitir silenciosamente
    }

    // Important: return the modified config
    config.cache = false;
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};

export default nextConfig;
