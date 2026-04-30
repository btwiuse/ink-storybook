// Browser shim for node:os
export function type() { return 'Browser'; }
export function platform() { return 'browser'; }
export function release() { return '0.0.0'; }
export function hostname() { return 'localhost'; }
export function tmpdir() { return '/tmp'; }
export function homedir() { return '/'; }
export function arch() { return 'x86_64'; }
export function cpus() { return []; }
export function networkInterfaces() { return {}; }
export function userInfo() { return { username: 'user', uid: -1, gid: -1, shell: null, homedir: '/' }; }
export const EOL = '\n';
export default { type, platform, release, hostname, tmpdir, homedir, arch, cpus, networkInterfaces, userInfo, EOL };
