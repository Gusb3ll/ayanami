import type { StreamOptions } from 'morgan'
import morgan from 'morgan'

import Logger from '../lib/logger'

const stream: StreamOptions = {
  write: message => Logger.http(message),
}

// const skip = () => {
//   const env = process.env.NODE_ENV || 'development'
//   return env !== 'development'
// }

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  // { stream, skip },
  { stream },
)

export default morganMiddleware
