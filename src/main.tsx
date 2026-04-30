import '@xterm/xterm/css/xterm.css'
import { Terminal } from '@xterm/xterm'
import React from 'react'
import { render } from 'ink'
import { EventEmitter } from 'events'
import { App } from './App'

interface Stream extends EventEmitter {
  columns: number
  rows: number
  write(str: string): void
  setEncoding(): void
  setRawMode(): void
  resume(): void
  pause(): void
  isTTY: boolean
}

const term = new Terminal({ convertEol: true, disableStdin: false })

const createStream = (columns = 80, rows = 24): Stream => {
  const stream = new EventEmitter() as Stream
  stream.columns = columns
  stream.rows = rows
  stream.isTTY = true
  stream.write = (str: string) => term.write(str)
  stream.setEncoding = () => {}
  stream.setRawMode = () => {}
  stream.resume = () => {}
  stream.pause = () => {}
  return stream
}

const stdout = createStream() as NodeJS.WriteStream & { fd: 1 }
const stdin = createStream() as NodeJS.ReadStream & { fd: 0 }

term.onData((data) => {
  ;(stdin as unknown as EventEmitter).emit('data', data)
})

const el = document.getElementById('terminal')!
term.open(el)
term.focus()

render(React.createElement(App), { stdout, stderr: stdout, stdin, patchConsole: false })
