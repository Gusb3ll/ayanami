import compression from 'compression'
import express from 'express'

import { quirks, trace } from './utils'
import morganMiddleware from '../../config/morganMiddleware'

import chuniRouter from './controller/chuni'

const app = express()

app.use(quirks)
app.use(morganMiddleware)
app.use(compression({ threshold: 0 }))
app.use(express.json({ limit: '50mb' })) // that ought to be enough
app.use(trace)

app.use('/ChuniServlet', chuniRouter)

export default app
