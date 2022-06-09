import type { Socket } from 'net'
import { dispatch } from './handler'
import { SqlRepositories } from './sql'
import { setup } from './services/pipeline.service'
import type { DataSource } from '../../utils/sql/api'

function aimeDb(db: DataSource) {
  return async function (socket: Socket) {
    console.log('Socket Connected')
    const { input, output } = await setup(socket)

    for await (const obj of input) {
      try {
        const now = new Date()
        const req = obj
        const res = await db.transaction(txn =>
          dispatch(new SqlRepositories(txn), req, now),
        )
        if (res === undefined) {
          console.log('Closing connection')
          break
        }
        output.write(res)
      }
      catch (err) {
        console.error(err)
        break
      }
    }

    console.log('Socket Closed')
    socket.end()
  }
}

export default aimeDb
