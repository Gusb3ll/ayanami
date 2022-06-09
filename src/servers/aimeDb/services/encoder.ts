import { Transform } from 'stream'
import Logger from '../../../lib/logger'

const registerLevels = new Map()

registerLevels.set('none', 0)
registerLevels.set('portal', 1)
registerLevels.set('segaid', 2)

function begin(length: number) {
  const buf = Buffer.alloc(length)
  buf.writeUInt16LE(0xA13E, 0x0000)
  buf.writeUInt16LE(0x3087, 0x0002)
  buf.writeUInt16LE(length, 0x0006)
  return buf
}

export class Encoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    })
  }

  _transform(msg, _encoder, callback) {
    Logger.debug(`ENCODER | Encode ${msg}`)

    let buf: Buffer

    switch (msg.type) {
      case 'felica_lookup':
        buf = begin(0x0030)
        buf.writeUInt16LE(0x0003, 0x0004) // cmd code
        buf.writeUInt16LE(msg.status, 0x0008)
        buf.write(msg.accessCode, 0x0024, 'hex')
        break

      case 'felica_lookup2':
        buf = begin(0x0140)
        buf.writeUInt16LE(0x0012, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        buf.writeInt32LE(msg.aimeId || -1, 0x0020)
        buf.writeUInt32LE(0xFFFFFFFF, 0x0024)
        buf.writeUInt32LE(0xFFFFFFFF, 0x0028)
        buf.write(msg.accessCode, 0x002C, 'hex')
        buf.writeUInt16LE(0x0001, 0x0037)

        break

      case 'hello':
        buf = begin(0x0020)
        buf.writeUInt16LE(0x0065, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)

        break

      case 'campaign':
        buf = begin(0x0200)
        buf.writeUInt16LE(0x000C, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        break

      case 'lookup':
        buf = begin(0x0130)
        buf.writeUInt16LE(0x0006, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        buf.writeInt32LE(msg.aimeId || -1, 0x0020)
        buf.writeUInt8(registerLevels[msg.registerLevel], 0x0024)
        break

      case 'lookup2':
        buf = begin(0x0130)
        buf.writeUInt16LE(0x0010, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        buf.writeInt32LE(msg.aimeId || -1, 0x0020)
        buf.writeUInt8(registerLevels[msg.registerLevel], 0x0024)
        break

      case 'unknown19':
        buf = begin(0x0013)
        buf.writeUInt16LE(0x0006, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        break

      case 'register':
        buf = begin(0x0030)
        buf.writeUInt16LE(0x0006, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        buf.writeInt32LE(msg.aimeId, 0x0020)
        break

      case 'log':
        buf = begin(0x0020)
        buf.writeUInt16LE(0x000A, 0x0004)
        buf.writeUInt16LE(msg.status, 0x0008)
        break

      default:
        return callback(new Error('Unimplemented response type'))
    }

    Logger.debug(`ENCODER | Send ${buf.toString('hex')}`)

    return callback(null, buf)
  }
}
