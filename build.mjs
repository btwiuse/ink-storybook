import * as esbuild from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const watching = process.argv.includes('--watch');

const shimPath = (name) => resolve(__dirname, 'src/shims', name);
const nmPath = (pkg) => resolve(__dirname, 'node_modules', pkg);

// Plugin: map node:* prefixed imports to browser-friendly equivalents
const nodeProtocolPlugin = {
  name: 'node-protocol',
  setup(build) {
    const nodeShims = {
      'process':       shimPath('process.js'),
      'events':        nmPath('events/events.js'),
      'stream':        shimPath('stream.js'),
      'buffer':        null,  // handled natively by esbuild browser platform
      'os':            shimPath('os.js'),
      'fs':            shimPath('empty.js'),
      'path':          null,  // handled natively by esbuild browser platform
      'module':        shimPath('module.js'),
      'child_process': shimPath('empty.js'),
      'net':           shimPath('empty.js'),
      'tls':           shimPath('empty.js'),
    };

    build.onResolve({ filter: /^node:/ }, (args) => {
      const name = args.path.slice(5); // strip 'node:' prefix
      if (name in nodeShims) {
        const target = nodeShims[name];
        if (target === null) return undefined; // let esbuild handle it
        return { path: target };
      }
      return { path: shimPath('empty.js') };
    });

    // Redirect bare 'module' require to our shim
    build.onResolve({ filter: /^module$/ }, () => ({
      path: shimPath('module.js'),
    }));
  },
};

/** @type {esbuild.BuildOptions} */
const options = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  platform: 'browser',
  target: 'es2022',
  outdir: 'dist',
  entryNames: 'index',
  format: 'esm',
  define: {
    'process.env.FORCE_COLOR': '"true"',
    'process.env.CI': 'false',
    'process.env.NODE_ENV': '"production"',
    'process.stderr.isTTY': 'false',
    'process.stdin.isTTY': 'false',
    'process.stdout.isTTY': 'true',
    'process.stdout.columns': '80',
    'process.stdout.rows': '24',
    'process.platform': '"browser"',
    'process.version': '"v0.0.0"',
  },
  alias: {
    'signal-exit':        shimPath('signal-exit.js'),
    'terminal-size':      shimPath('terminal-size.js'),
    'ws':                 shimPath('ws.js'),
    'cli-cursor':         shimPath('cli-cursor.js'),
    'react-devtools-core': shimPath('empty.js'),
  },
  plugins: [nodeProtocolPlugin],
  logLevel: 'info',
};

await mkdir('dist', { recursive: true });

if (watching) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(options);
  await copyFile('index.html', 'dist/index.html');
  await copyFile('node_modules/@xterm/xterm/css/xterm.css', 'dist/xterm.css');
  console.log('Build complete → dist/');
}
