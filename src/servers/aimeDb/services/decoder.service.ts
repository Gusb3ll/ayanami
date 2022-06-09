import { Transform } from 'stream'

import Logger from '../../../lib/logger'

function begin(msg) {
  const gameId = msg.toString('ascii', 0x000A, 0x000E)
  const keychipId = msg.toString('ascii', 0x0014, 0x001F)
  return { gameId, keychipId }
}

function readRegisterRequest(msg) {
  const luid = msg.slice(0x0020, 0x002A).toString('hex')
  return {
    ...begin(msg),
    type: 'register',
    luid,
  }
}

function readFeliCaLookupRequest(msg) {
  return {
    ...begin(msg),
    type: 'felica_lookup',
    idm: msg.slice(0x0020, 0x0028).toString('hex'),
    pmm: msg.slice(0x0028, 0x0030).toString('hex'),
  }
}

function readFeliCaLookupRequest2(msg) {
  return {
    ...begin(msg),
    type: 'felica_lookup2',
    idm: msg.slice(0x0030, 0x0038).toString('hex'),
    pmm: msg.slice(0x0038, 0x0040).toString('hex'),
  }
}

function readLogRequest(msg) {
  return {
    ...begin(msg),
    type: 'log',
    field20: msg.readUInt32LE(0x20),
    field24: msg.readUInt32LE(0x24),
    field28: msg.readUInt32LE(0x28),
    field2C: msg.readUInt32LE(0x2C),
    field30: msg.readUInt32LE(0x30),
    field34: msg.readUInt32LE(0x34),
    field38: msg.readUInt32LE(0x38),
    field3C: msg.readUInt32LE(0x3C),
  }
}

function readCampaignRequest(msg) {
  return {
    ...begin(msg),
    type: 'campaign',
  }
}

function readLookupRequest(msg) {
  const luid = msg.slice(0x0020, 0x002A).toString('hex')
  return {
    ...begin(msg),
    type: 'lookup',
    luid,
  }
}

function readLookupRequest2(msg) {
  const luid = msg.slice(0x0020, 0x002A).toString('hex')
  return {
    ...begin(msg),
    type: 'lookup2',
    luid,
  }
}

function unknown19Request(msg) {
  return {
    ...begin(msg),
    type: 'unknown19',
  }
}

function readHelloRequest(msg) {
  return {
    ...begin(msg),
    type: 'hello',
  }
}

function readGoodbyeRequest() {
  return {
    type: 'goodbye',
  }
}

const readers = new Map()

readers.set(0x0001, readFeliCaLookupRequest)
readers.set(0x0004, readLookupRequest)
readers.set(0x0005, readRegisterRequest)
readers.set(0x0009, readLogRequest)
readers.set(0x000B, readCampaignRequest)
readers.set(0x000D, readRegisterRequest)
readers.set(0x000F, readLookupRequest2)
readers.set(0x0011, readFeliCaLookupRequest2)
readers.set(0x0013, unknown19Request)
readers.set(0x0064, readHelloRequest)
readers.set(0x0066, readGoodbyeRequest)

export class Decoder extends Transform {
  constructor() {
    super({
      readableObjectMode: true,
      writableObjectMode: true,
    })
  }

  _transform(msg: Buffer, _encoding, callback) {
    const code = msg.readUInt16LE(0x04)
    const reader = readers.get(code)

    if (reader === undefined) {
      return callback(
        new Error(`Unknown command code 0x${code.toString(16)}`),
      )
    }

    const obj = reader(msg)

    Logger.debug(`DECODER | Decode ${obj}`)

    return callback(null, obj)
  }
}
