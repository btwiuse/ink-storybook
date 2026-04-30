/* Browser shim for Node.js process module */

export const env = {};
export const argv = [];
export const version = '';
export const versions = {};
export const browser = true;
export const title = 'browser';

export function cwd() { return '/'; }
export function chdir() { throw new Error('process.chdir is not supported'); }
export function umask() { return 0; }
export function nextTick(fn, ...args) { Promise.resolve().then(() => fn(...args)); }

function noop() {}
export const on = noop;
export const addListener = noop;
export const once = noop;
export const off = noop;
export const removeListener = noop;
export const removeAllListeners = noop;
export const emit = noop;
export const prependListener = noop;
export const prependOnceListener = noop;
export function listeners() { return []; }

const process = {
  env,
  argv,
  version,
  versions,
  browser,
  title,
  cwd,
  chdir,
  umask,
  nextTick,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  prependListener,
  prependOnceListener,
  listeners,
};

export default process;
