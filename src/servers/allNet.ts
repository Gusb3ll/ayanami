import type { Application, NextFunction, Request, Response } from 'express'
import compression from 'compression'
import { addHours } from 'date-fns'
import { unzipSync } from 'zlib'
import iconv from 'iconv-lite'
import express from 'express'
import read from 'raw-body'

import morganMiddleware from '../config/morganMiddleware'
import { startupHost, startupUri } from '../utils/switchboard'

const app: Application = express()

const hourDelta = parseInt(process.env.HOUR_DELTA!)

app.use(compression())
app.use(express.json())
app.use(morganMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'I love loli - Gusbell' })
})

app.use('/sys/servlet/PowerOn', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method !== 'POST') { res.status(405).json({ error: 'Method Not Allowed' }) }
    if (!req.is('application/x-www-form-urlencoded')) { return next() }

    const base64 = await read(req, { encoding: 'ascii' })
    const bytes = unzipSync(Buffer.from(base64, 'base64'))
    const str = bytes.toString('ascii').trim()
    const kvps = str.split('&')
    const reqParams = {}

    kvps.forEach((kvp) => {
      const [key, value] = kvp.split('=')
      reqParams[key] = value
    })

    const send_ = res.send

    req.body = reqParams
    res.send = (resParams) => {
      const str = `${Object.entries(resParams).map(([key, val]) => `${key}=${val}`).join('&')}\n`
      res.set('content-type', 'text/plain')
      return send_.apply(res, [iconv.encode(str, 'shift_jis')])
    }

    return next()
  }
  catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err })
  }
})

app.post('/sys/servlet/DownloadOrder', (_req: Request, _res: Response) => {
  // ! NOT IMPLEMENT YET
  return null
})

// PowerOnResponseV3 from aqua
app.post('/sys/servlet/PowerOn', (req: Request, res: Response) => {
  try {
    const dateAdjusted = addHours(new Date(), -hourDelta)
    const isoStr = `${dateAdjusted.toISOString().substring(0, 19)}Z`
    const resParams = {
      stat: 1,
      uri: startupUri(req.body.game_id),
      host: startupHost(req.body.game_id),
      place_id: '123',
      name: process.env.SHOP_NAME,
      nickname: process.env.SHOP_NAME,
      region0: '1',
      region_name0: 'W',
      region_name1: 'X',
      region_name2: 'Y',
      region_name3: 'Z',
      country: process.env.SHOP_REGION || 'JPN',
      allnet_id: '456',
      client_timezone: '+0900',
      utc_time: isoStr,
      setting: '',
      res_ver: '3',
      token: req.body.token,
    }
    return res.status(200).send(resParams)
  }
  catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err })
  }
})

export default app
