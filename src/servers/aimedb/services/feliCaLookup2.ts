import prisma from './db'

export default async function feliCaLookup2(req) {
  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()
  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }
  const aimeId = await prisma.segaCard.findUnique({ where: { luid: accessCode.toString() }, select: { extId: true } })
  return {
    type: 'felica_lookup2',
    status: 1,
    accessCode,
    aimeId,
  }
}
