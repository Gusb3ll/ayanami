import type { Socket } from 'net'

export default function aimeDb() {
  return async function (socket: Socket) {
    console.log('Socket connected')
    try {
      console.log(socket)
    }
    catch (err) {
      console.error('Error :', err)
    }
    console.log('Socket disconnected')
    socket.end()
  }
}
