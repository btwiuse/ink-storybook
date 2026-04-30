// Browser shim for cli-cursor – no-op: browsers manage cursor visibility via CSS
export function show() {}
export function hide() {}
export function toggle() {}
export default { show, hide, toggle };
