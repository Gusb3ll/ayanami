import { createCipheriv, createDecipheriv } from 'crypto'
import * as stream from 'stream'
import { promisify } from 'util'

import { Decoder } from './decoder'
import { Encoder } from './encoder'
import { Deframer } from './frame'

const K = Buffer.from('Copyright(C)SEGA', 'utf8')
const pipeline = promisify(stream.pipeline)

export function setup(stream) {
  const input = new Decoder()

  pipeline(
    stream,
    createDecipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    new Deframer({}),
    input,
  ).catch(() => { })

  const output = new Encoder()

  pipeline(
    output,
    createCipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    stream,
  ).catch(() => { })

  return { input, output }
}
