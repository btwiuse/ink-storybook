import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['stream', 'buffer', 'os', 'tty', 'events', 'assert'],
      globals: { Buffer: true },
      overrides: {
        process: path.resolve(__dirname, 'src/process-shim.ts'),
      },
    }),
  ],
  resolve: {
    alias: {
      'node:process': path.resolve(__dirname, 'src/process-shim.ts'),
      'process': path.resolve(__dirname, 'src/process-shim.ts'),
      'node:child_process': path.resolve(__dirname, 'src/child_process-shim.ts'),
      'child_process': path.resolve(__dirname, 'src/child_process-shim.ts'),
      'terminal-size': path.resolve(__dirname, 'src/terminal-size-shim.ts'),
      'module': path.resolve(__dirname, 'src/empty.ts'),
      'fs': path.resolve(__dirname, 'src/empty.ts'),
      'node:fs': path.resolve(__dirname, 'src/empty.ts'),
    },
  },
});
