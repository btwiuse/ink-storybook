// Minimal browser shim for node:stream
import { EventEmitter } from 'events';

export class Stream extends EventEmitter {
  pipe(dest) { return dest; }
}

export class Readable extends Stream {
  read() {}
}

export class Writable extends Stream {
  write() { return true; }
  end() {}
}

export class Duplex extends Stream {
  read() {}
  write() { return true; }
  end() {}
}

export class PassThrough extends Duplex {
  constructor() {
    super();
    this._buffer = [];
  }
  write(chunk) {
    this.emit('data', chunk);
    return true;
  }
}

export class Transform extends Duplex {}

export default { Stream, Readable, Writable, Duplex, PassThrough, Transform };
