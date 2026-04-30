import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import React from 'react';
import { render } from 'ink';
import { EventEmitter } from 'events';
import { App } from './App';

interface FakeStream extends EventEmitter {
  columns: number;
  rows: number;
  isTTY: boolean;
  write(str: string): void;
  setEncoding(): void;
  setRawMode(): void;
  resume(): void;
  pause(): void;
}

const term = new Terminal({ convertEol: true, disableStdin: false });

const createFakeStream = (): FakeStream => {
  const stream = new EventEmitter() as FakeStream;
  stream.columns = 80;
  stream.rows = 24;
  stream.isTTY = true;
  stream.write = (str: string) => term.write(str);
  stream.setEncoding = () => {};
  stream.setRawMode = () => {};
  stream.resume = () => {};
  stream.pause = () => {};
  return stream;
};

const stdout = createFakeStream() as NodeJS.WriteStream & { fd: 1 };
const stdin = createFakeStream() as NodeJS.ReadStream & { fd: 0 };

term.onData((data) => {
  (stdin as unknown as EventEmitter).emit('data', data);
});

render(React.createElement(App), {
  stdout,
  stderr: stdout as unknown as NodeJS.WriteStream & { fd: 2 },
  stdin,
  debug: false,
  patchConsole: false,
});

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('terminal');
  if (el) {
    term.open(el);
    term.focus();
  }
});
