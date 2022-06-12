import prisma from '../services/db'

export default async function getUserActivity(req) {
  const userActivityList = await prisma.chusanUserActivity.findMany({ where: { userId: req.userId, kind: req.kind } })
  return {
    userId: req.userId,
    length: userActivityList.length,
    kind: req.kind,
    userActivityList,
  }
}
