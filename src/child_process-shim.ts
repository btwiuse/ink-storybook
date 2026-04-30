// Browser stub for child_process
export const execFileSync = (_cmd: string, _args?: string[]) => Buffer.from('');
export const execSync = (_cmd: string) => Buffer.from('');
export const spawnSync = () => ({ stdout: Buffer.from(''), stderr: Buffer.from(''), status: 0 });
export default { execFileSync, execSync, spawnSync };
