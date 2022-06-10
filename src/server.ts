import 'dotenv/config'
import net from 'net'
import http from 'http'
import https from 'https'
import { readFileSync } from 'fs'

import Logger from './lib/logger'

import aimedb from './servers/aimedb'
import allNet from './servers/allNet'
import billing from './servers/billing'

import chunithm from './servers/chunithm'

const tls = { cert: readFileSync('pki/server.pem'), key: readFileSync('pki/server.key') };

(async () => {
  net.createServer(aimedb).listen(parseInt(process.env.PORT_AIMEDB!) || 22345, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`Aime Database server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_AIMEDB || 22345}`)
  })
  http.createServer(allNet).listen(parseInt(process.env.PORT_ALLNET!) || 80, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`ALL.Net server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_ALLNET || 80}`)
  })
  https.createServer(tls, billing).listen(parseInt(process.env.PORT_BILLING!) || 8443, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`Billing server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_BILLING || 8443}`)
  })
  http.createServer(chunithm).listen(parseInt(process.env.PORT_CHUNITHM!) || 9001, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`ALL.Net server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_CHUNITHM || 9001}`)
  })
})()

