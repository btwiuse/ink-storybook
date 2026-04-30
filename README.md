# Ink + Xterm in the Browser

Runs [Ink v7](https://github.com/vadimdemedes/ink) via [Xterm.js v6](https://xtermjs.org/) in the browser, bundled with [Vite](https://vitejs.dev/).

## Stack

- **ink** v7 — React-based CLI UI framework
- **@xterm/xterm** v6 — full terminal emulator in the browser
- **Vite** v8 — fast ES-module bundler
- **React** 19 / **TypeScript** 5

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # preview production build
```

## How it works

A pair of fake `stdout`/`stdin` streams (backed by `EventEmitter`) bridge Ink's
renderer to the Xterm terminal instance mounted on `#terminal`. Key presses
forwarded from `term.onData` let Ink's `useInput` hook work just as in a real
terminal.
