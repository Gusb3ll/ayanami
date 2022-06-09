function hello(_rep, req, _now) {
  return { type: req.type, status: 1 }
}

function campaign(_rep, req, _now) {
  return { type: req.type, status: 1 }
}

function feliCaLookup(_rep, req, _now) {
  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()
  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }
  return { type: req.type, status: 1, accessCode }
}

async function feliCaLookup2(rep, req, now) {
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

async function unknown19(_rep, req, _now) {
  return {
    type: req.type,
    status: 1,
  }
}

async function lookup(rep, req, now) {
  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: 'none',
  }
}

async function lookup2(rep, req, now) {
  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().lookup(req.luid, now),
    registerLevel: 'none',
  }
}

async function register(rep, req, now) {
  return {
    type: req.type,
    status: 1,
    aimeId: await rep.cards().register(req.luid, now),
  }
}

function log(_rep, req, _now) {
  return { type: req.type, status: 1 }
}

export async function dispatch(rep, req, now) {
  switch (req.type) {
    case 'hello':
      return hello(rep, req, now)

    case 'campaign':
      return campaign(rep, req, now)

    case 'felica_lookup':
      return feliCaLookup(rep, req, now)

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
      return log(rep, req, now)

    case 'goodbye':
      console.log('Goodbye')

      return undefined

    default:
      throw new Error('Aimedb: Handler not implemented!')
  }
}
