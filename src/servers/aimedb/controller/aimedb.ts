import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

async function feliCaLookup2(req, now) {
  // ! to check
  const { id, ext_id } = await prisma.aime_player.findUnique({ where: { luid: req.luid }, select: { id: true, ext_id: true } })
  await prisma.aime_player.update({ where: { id }, data: { access_time: now } })
  return {
    type: req.type,
    status: 1,
    aimeId: ext_id,
  }
}

function unknown19(req) {
  return { type: req.type, status: 1 }
}

async function lookup(req) {
  // ! to check
  const aimeId = await prisma.aime_player.findUnique({ where: { luid: req.luid }, select: { ext_id: true } })
  return {
    type: req.type,
    status: 1,
    aimeId,
    registerLevel: 'none',
  }
}

async function lookup2(req) {
  // ! to check
  const aimeId = await prisma.aime_player.findUnique({ where: { luid: req.luid }, select: { ext_id: true } })
  return {
    type: req.type,
    status: 1,
    aimeId,
    registerLevel: 'none',
  }
}

async function register() {
  return null
}

function log(req) {
  return { type: req.type, status: 1 }
}

function touch(req) {
  return { type: req.type, status: 1 }
}

export function handle(req, now) {
  switch (req.type) {
    case 'hello':
      return hello(req)

    case 'campaign':
      return campaign(req)

    case 'felica_lookup':
      return feliCaLookup(req)

    case 'felica_lookup2':
      return feliCaLookup2(req, now)

    case 'unknown19':
      return unknown19(req)

    case 'lookup':
      return lookup(req)

    case 'lookup2':
      return lookup2(req)

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
