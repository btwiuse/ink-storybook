import { Terminal } from '@xterm/xterm';
import React from 'react';
import { render } from 'ink';
import { EventEmitter } from 'events';
import { App } from './app';

const term = new Terminal({ convertEol: true, disableStdin: false });

interface InkStream extends EventEmitter {
  columns: number;
  rows: number;
  isTTY: boolean;
  write(str: string): void;
  setEncoding(): void;
  setRawMode(): void;
  resume(): void;
  pause(): void;
}

const createStream = (columns = 80, rows = 24): InkStream => {
  const stream = new EventEmitter() as InkStream;
  stream.columns = columns;
  stream.rows = rows;
  stream.isTTY = true;
  stream.write = (str: string) => term.write(str);
  stream.setEncoding = () => {};
  stream.setRawMode = () => {};
  stream.resume = () => {};
  stream.pause = () => {};
  return stream;
};

const stdout = createStream() as NodeJS.WriteStream & { fd: 1 };
const stdin = createStream() as NodeJS.ReadStream & { fd: 0 };

term.onData((data) => {
  (stdin as unknown as EventEmitter).emit('data', data);
});

render(React.createElement(App, {}), {
  stdout,
  stderr: stdout,
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
