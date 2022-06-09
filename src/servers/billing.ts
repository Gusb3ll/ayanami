import type { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import { inflateRawSync } from 'zlib'
import { createSign } from 'crypto'
import { readFileSync } from 'fs'
import express from 'express'
import read from 'raw-body'

import morganMiddleware from '../config/morganMiddleware'

interface Kvps {
  [key: string]: string
}

const app: Application = express()

const billingKeyPair = readFileSync('pki/billing.key')
const playLimit = 1024
const nearFull = 0x00010200

app.use(compression())
app.use(express.json())
app.use(morganMiddleware)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqBytesZ = await read(req)
    const reqBytes = inflateRawSync(reqBytesZ)
    const reqStr = reqBytes.toString('ascii')

    req.body = reqStr.trim().split('\r\n').map((line) => {
      const params = {}
      for (const kvp of line.split('&')) {
        const [key, val] = kvp.split('=')
        params[key] = val
      }
      return params
    })

    const send_ = res.send

    res.send = (lines: Kvps[]) => {
      const str = `${lines.map(line =>
        Object.entries(line).map(([key, val]) => `${key}=${val}`).join('&'),
      ).join('\r\n')}\r\n`
      res.set('content-type', 'text/plain')
      return send_.apply(res, [str])
    }

    return next()
  }
  catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err })
  }
})

app.post('/request', (req: Request, res: Response) => {
  try {
    const first = req.body[0]

    const [playlimitsig, nearfullsig] = [playLimit, nearFull].map((value) => {
      const buf = Buffer.alloc(15)
      buf.writeInt32LE(value, 0)
      buf.write(first.keychipid, 4)
      return createSign('RSA-SHA1')
        .update(buf)
        .sign(billingKeyPair, 'hex')
    })

    const resParams: Kvps[] = []

    resParams.push({
      result: '0',
      waittime: '100',
      linelimit: '1',
      message: '',
      playlimit: String(playLimit),
      playlimitsig,
      protocolver: '1.000',
      nearfull: String(nearFull),
      nearfullsig,
      fixlogcnt: '0',
      fixinterval: '5',
      playhistory: '000000/0:000000/0:000000/0',
    })

    res.set('content-type', 'text/plain')
    return res.status(200).send(resParams)
  }
  catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err })
  }
})

export default app
