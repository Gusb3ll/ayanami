import Logger from '../../lib/logger'

import { setup } from './services/pipeline'
import { handle } from './controller/aimedb'

export default async function aimedb(stream) {
  const { input, output } = setup(stream)

  for await (const obj of input) {
    try {
      const now = new Date()
      const req = obj
      const res = handle(req, now)
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
