import 'dotenv/config'
import net from 'net'
import http from 'http'
import https from 'https'
import { readFileSync } from 'fs'

import Logger from './lib/logger'
import { openSqlite } from './utils/sql'

import aimeDb from './servers/aimeDb'
import allNet from './servers/allNet'
import billing from './servers/billing'

import chusan from './servers/chusan'

const tls = { cert: readFileSync('pki/server.pem'), key: readFileSync('pki/server.key') };

(async () => {
  const db = openSqlite('./db.sqlite3')
  net.createServer(aimeDb(db)).listen(parseInt(process.env.PORT_AIMEDB!) || 22345, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`AimeDB server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_AIMEDB || 22345}`)
  })
  http.createServer(allNet).listen(parseInt(process.env.PORT_ALLNET!) || 80, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`ALL.Net server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_ALLNET || 80}`)
  })
  https.createServer(tls, billing).listen(parseInt(process.env.PORT_BILLING!) || 8443, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`Billing server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_BILLING || 8443}`)
  })
  http.createServer(chusan).listen(parseInt(process.env.PORT_CHUNITHM!) || 9001, process.env.HOST_INT || '0.0.0.0', () => {
    Logger.debug(`ALL.Net server started on ${process.env.HOST_INT || '0.0.0.0'}:${process.env.PORT_CHUNITHM || 9001}`)
  })
})()

