// Browser shim for signal-exit – no-op since browsers don't have process signals
export function onExit() {
  return () => {};
}
export default onExit;
