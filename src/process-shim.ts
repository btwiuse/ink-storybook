export const env: Record<string, string> = { FORCE_COLOR: '1' };
export const cwd = () => '/';
export const platform = 'browser';
export const version = 'v20.0.0';
export const argv: string[] = ['node', 'browser'];
export const exit = (_code?: number) => {};
export const stdout = { write: (_s: string) => {} };
export const stderr = { write: (_s: string) => {} };

const process = { env, cwd, platform, version, argv, exit, stdout, stderr };
export default process;
