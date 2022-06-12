import Logger from '../../lib/logger'

import { setup } from './utils/pipeline'
import aimedbController from './controller/aimedb'

export default async function app(stream) {
  const { input, output } = setup(stream)

  for await (const obj of input) {
    try {
      const req = obj
      const res = aimedbController(req)
      if (res === undefined) {
        Logger.debug('Socket closing')
        break
      }
      output.write(res)
    }
    catch (err) {
      Logger.error(`Socket Error ${err}`)
      break
    }
  }

  Logger.debug('Socket closed')
  stream.end()
}
