import prisma from '../services/db'

export default async function gameLogin(req) {
  const userId = req.userId
  const user = await prisma.segaCard.findUnique({ where: { extId: userId } })
  if (user) {
    return { returnCode: '1' }
  }
}
