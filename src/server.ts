import 'dotenv/config'
// import net from 'net'
import http from 'http'
import https from 'https'
import { readFileSync } from 'fs'

import Logger from './lib/logger'

// import aimeDb from './servers/aimeDb'
import allNet from './servers/allNet'
import billing from './servers/billing'

const tls = { cert: readFileSync('pki/server.pem'), key: readFileSync('pki/server.key') };

(async () => {
  // net.createServer(aimeDb(db)).listen(parseInt(process.env.PORT_AIMEDB) || 22345, process.env.HOST_INT, () => {
  //   Logger.debug(`AimeDB server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_AIMEDB || 22345}`)
  // })
  http.createServer(allNet).listen(parseInt(process.env.PORT_ALLNET) || 80, process.env.HOST_INT, () => {
    Logger.debug(`ALL.Net server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_ALLNET || 80}`)
  })
  https.createServer(tls, billing).listen(parseInt(process.env.PORT_BILLING) || 8443, process.env.HOST_INT, () => {
    Logger.debug(`Billing server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_BILLING || 8443}`)
  })
})()

