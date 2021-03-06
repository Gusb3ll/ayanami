import { Transform } from 'stream'

import Logger from '../../../lib/logger'

export class Deframer extends Transform {
  private state: Buffer

  constructor(options) {
    super({
      readableObjectMode: true,
      ...options,
    })

    this.state = Buffer.alloc(0)
  }

  _transform(chunk, _encoding, callback) {
    this.state = Buffer.concat([this.state, chunk])

    if (this.state.length < 8) {
      return
    }

    const magic = this.state.readUInt16LE(0x0000)

    if (magic !== 0xA13E) {
      return callback(new Error(`Invalid magic (decimal ${magic})`))
    }

    const len = this.state.readUInt16LE(0x0006)

    if (this.state.length < len) { return }

    const frame = this.state.slice(0, len)

    Logger.debug(`FRAMER | Recv ${frame.toString('hex')}`)

    this.state = this.state.slice(len)

    return callback(null, frame)
  }
}
