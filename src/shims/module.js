// Browser shim for node:module
export const builtinModules = [];
export function createRequire() {
  return () => { throw new Error('require is not supported in browser'); };
}
export default { builtinModules, createRequire };
