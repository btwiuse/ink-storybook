// Browser shim for node:process – re-export the esbuild-injected global
export default globalThis.process;
export const env = globalThis.process?.env ?? {};
export const { cwd = () => '/', exit = () => {}, platform = 'browser', version = 'v0.0.0', versions = {}, stdout = {}, stderr = {}, stdin = {} } = globalThis.process ?? {};
