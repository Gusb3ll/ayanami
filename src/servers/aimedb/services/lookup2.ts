import prisma from './db'

export default async function lookup2(req) {
  const aimeId = await prisma.segaCard.findUnique({ where: { luid: req.luid }, select: { extId: true } })
  return {
    type: 'lookup',
    status: 1,
    aimeId: aimeId || -1,
    registerLevel: 'none',
  }
}
