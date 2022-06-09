import type { Repositories } from './repo'
import type * as Req from './interfaces/request'
import type * as Res from './interfaces/response'

function hello(
  rep: Repositories,
  req: Req.HelloRequest,
): Res.HelloResponse {
  console.log('Hello')

  return { type: req.type, status: 1 }
}

function campaign(
  rep: Repositories,
  req: Req.CampaignRequest,
): Res.CampaignResponse {
  console.log('Campaign stuff')

  return { type: req.type, status: 1 }
}

function feliCaLookup(
  rep: Repositories,
  req: Req.FeliCaLookupRequest,
): Res.FeliCaLookupResponse {
  console.log('FeliCa access code lookup')

  // Well, this access code transformation is the million dollar question eh
  // Return a decimal representation for now.

  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()

  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }

  return { type: req.type, status: 1, accessCode }
}

async function feliCaLookup2(
  rep: Repositories,
  req: Req.FeliCaLookup2Request,
  now: Date,
): Promise<Res.FeliCaLookup2Response> {
  console.log('FeliCa access code lookup')

  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()

  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }

  return {
    type: req.type,
    status: 1,
    accessCode,
    aimeId: await rep.cards().lookup(accessCode, now),
  }
}

async function unknown19(rep, req, _now) {
  return {
    type: req.type,
    status: 1,
  }
}

async function lookup(
  rep: Repositories,
  req: Req.LookupRequest,
  now: Date,
): Promise<Res.LookupResponse> {
  console.log('Mifare lookup: luid=%s', req.luid)

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: 'none',
  }
}

async function lookup2(
  rep: Repositories,
  req: Req.LookupRequest2,
  now: Date,
): Promise<Res.LookupResponse2> {
  console.log('FeliCa lookup: luid=%s', req.luid)

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: 'none',
  }
}

async function register(
  rep: Repositories,
  req: Req.RegisterRequest,
  now: Date,
): Promise<Res.RegisterResponse> {
  console.log('User register: luid=%s', req.luid)

  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().register(req.luid, now),
  }
}

function log(
  rep: Repositories,
  req: Req.LogRequest,
): Res.LogResponse {
  console.log('Log message')

  return { type: req.type, status: 1 }
}

export async function dispatch(
  rep,
  req,
  now,
) {
  switch (req.type) {
    case 'hello':
      return hello(rep, req)

    case 'campaign':
      return campaign(rep, req)

    case 'felica_lookup':
      return feliCaLookup(rep, req)

    case 'felica_lookup2':
      return feliCaLookup2(rep, req, now)

    case 'lookup':
      return lookup(rep, req, now)

    case 'lookup2':
      return lookup2(rep, req, now)

    case 'unknown19':
      return unknown19(rep, req, now)

    case 'register':
      return register(rep, req, now)

    case 'log':
      return log(rep, req)

    case 'goodbye':
      console.log('Goodbye')

      return undefined

    default:
      throw new Error('Aimedb: Handler not implemented!')
  }
}
