import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['path', 'stream', 'buffer', 'assert', 'os', 'tty', 'events', 'util', 'string_decoder'],
      exclude: ['fs', 'module', 'child_process'],
    }),
  ],
  resolve: {
    alias: {
      'process': path.resolve(__dirname, 'shims/process.js'),
      'node:process': path.resolve(__dirname, 'shims/process.js'),
      'supports-color/browser.js': path.resolve(__dirname, 'patched-supports-color.js'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
      },
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
