// Browser stub – export common fs/module names as no-ops so bundler warnings are suppressed
export const existsSync = (_path: string) => false;
export const readFileSync = (_path: string, _enc?: string): string => '';
export const writeFileSync = () => {};
export const mkdirSync = () => {};
export const statSync = () => ({ isFile: () => false, isDirectory: () => false });
export default {};
