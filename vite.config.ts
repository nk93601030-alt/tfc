import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Security: Set strict security headers (allowing Google Maps iframe)
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com"
      }
    },
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? (['console', 'debugger'] as ('console' | 'debugger')[]) : [],
    },
    // Production security optimizations
    build: {
      minify: 'esbuild' as const,
      // Prevent source maps leak in production
      sourcemap: process.env.NODE_ENV !== 'production',
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
      // Rollup security options
      rollupOptions: {
        output: {
          // Sanitize output filenames
          sanitizeFileName: true,
        }
      }
    }
  };
});
