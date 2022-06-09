import { createCipheriv, createDecipheriv } from 'crypto'
import type { Socket } from 'net'
import * as stream from 'stream'
import { promisify } from 'util'

import { Decoder } from './decoder'
import { Encoder } from './encoder'
import { Deframer } from './frame'

const K = Buffer.from('Copyright(C)SEGA', 'utf8')
const pipeline = promisify(stream.pipeline)

export function setup(socket: Socket) {
  const input = new Decoder()

  pipeline(
    socket,
    createDecipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    new Deframer({}),
    input,
  ).catch(() => { })

  const output = new Encoder()

  pipeline(
    output,
    createCipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    socket,
  ).catch(() => { })

  return { input, output }
}
