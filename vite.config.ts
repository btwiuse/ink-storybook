import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'stream', 'events', 'os', 'assert', 'util', 'tty'],
      globals: { process: true, Buffer: true },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      'node:process': resolve(__dirname, 'src/mocks/node-process.js'),
      'node:fs': resolve(__dirname, 'src/mocks/node-fs.js'),
      'node:module': resolve(__dirname, 'src/mocks/node-module.js'),
      module: resolve(__dirname, 'src/mocks/node-module.js'),
      'supports-color': resolve(__dirname, 'src/mocks/supports-color.js'),
      'cli-cursor': resolve(__dirname, 'src/mocks/cli-cursor.js'),
      'signal-exit': resolve(__dirname, 'src/mocks/signal-exit.js'),
      'terminal-size': resolve(__dirname, 'src/mocks/terminal-size.js'),
      'is-in-ci': resolve(__dirname, 'src/mocks/is-in-ci.js'),
      'patch-console': resolve(__dirname, 'src/mocks/patch-console.js'),
      'code-excerpt': resolve(__dirname, 'src/mocks/code-excerpt.js'),
    },
  },
  define: {
    'process.env.FORCE_COLOR': JSON.stringify('1'),
    'process.env.CI': JSON.stringify(''),
  },
})
