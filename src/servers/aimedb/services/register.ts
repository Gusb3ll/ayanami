import prisma from './db'

export default async function register(req) {
  const now = new Date()
  let extId = Math.floor(Math.random() * 1000000)
  while (await prisma.segaCard.findUnique({ where: { extId } })) {
    extId = Math.floor(Math.random() * 1000000)
  }
  await prisma.segaCard.create({
    data: {
      luid: req.luid,
      extId,
      registerTime: now,
      accessTime: now,
    },
  })
  const aimeId = await prisma.segaCard.findUnique({ where: { luid: req.luid }, select: { extId: true } })
  return {
    type: 'register',
    status: 1,
    aimeId,
  }
}
