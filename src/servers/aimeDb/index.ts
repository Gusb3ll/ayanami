import type { Socket } from 'net'
import { dispatch } from './handler'
import { SqlRepositories } from './sql'
import { setup } from './services/pipeline'
import type { DataSource } from '../../utils/sql/api'

import Logger from '../../lib/logger'

function aimeDb(db: DataSource) {
  return async function (socket: Socket) {
    Logger.debug('AimeDB | Socket Connected')
    const { input, output } = await setup(socket)

    for await (const obj of input) {
      try {
        const now = new Date()
        const req = obj
        const res = await db.transaction(txn =>
          dispatch(new SqlRepositories(txn), req, now),
        )
        if (res === undefined) {
          Logger.debug('AimeDB | Socket Closing')
          break
        }
        output.write(res)
      }
      catch (err) {
        console.error(err)
        break
      }
    }

    Logger.debug('AimeDB | Socket Closed')
    socket.end()
  }
}

export default aimeDb
