// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

function hello(req) {
  return { type: req.type, status: 1 }
}

function campaign(req) {
  return { type: req.type, status: 1 }
}

function feliCaLookup(req) {
  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()
  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }
  return { type: req.type, status: 1, accessCode }
}

function feliCaLookup2() {
  return null
}

function unknown19(req) {
  return { type: req.type, status: 1 }
}

function lookup() {
  return null
}

function lookup2() {
  return null
}

function register() {
  return null
}

function log(req) {
  return { type: req.type, status: 1 }
}

function touch(req) {
  return { type: req.type, status: 1 }
}

export function handle(req, _now) {
  switch (req.type) {
    case 'hello':
      return hello(req)

    case 'campaign':
      return campaign(req)

    case 'felica_lookup':
      return feliCaLookup(req)

    case 'felica_lookup2':
      return feliCaLookup2()

    case 'unknown19':
      return unknown19(req)

    case 'lookup':
      return lookup()

    case 'lookup2':
      return lookup2()

    case 'register':
      return register()

    case 'log':
      return log(req)

    case 'touch':
      return touch(req)

    case 'goodbye':
      return undefined

    default:
      throw new Error('Unimplemented handler')
  }
}
