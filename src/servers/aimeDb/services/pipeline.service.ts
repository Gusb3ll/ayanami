import { createCipheriv, createDecipheriv } from 'crypto'
import type { Socket } from 'net'
import * as stream from 'stream'
import { promisify } from 'util'

import { Decoder } from './decoder.service'
import { Deframer } from './frame.service'
import { Encoder } from './encoder.service'
import type { AimeRequest } from '../interfaces/request'
import type { AimeResponse } from '../interfaces/response'

const K = Buffer.from('Copyright(C)SEGA', 'utf8')
const pipeline = promisify(stream.pipeline)

export interface Session {
  input: AsyncIterable<AimeRequest>
  output: {
    write(res: AimeResponse): void
  }
}

function doNothing() { }

export function setup(socket: Socket): Session {
  const input = new Decoder()

  pipeline(
    socket,
    createDecipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    new Deframer({}),
    input,
  ).catch(doNothing)

  const output = new Encoder()

  pipeline(
    output,
    createCipheriv('aes-128-ecb', K, null).setAutoPadding(false),
    socket,
  ).catch(doNothing)

  return { input, output }
}
