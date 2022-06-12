import prisma from '../services/db'

export default async function getGameCharge() {
  const gameChargeList = await prisma.chusanGameCharge.findMany()
  return {
    length: gameChargeList.length,
    gameChargeList,
  }
}
