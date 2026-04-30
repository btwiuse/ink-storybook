// Browser shim for terminal-size – return a fixed default size
export default function terminalSize() {
  return { columns: 80, rows: 24 };
}
