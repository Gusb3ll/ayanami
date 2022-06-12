import prisma from '../services/db'

export default async function getGameEvent() {
  const gameEventList = await prisma.chusanGameEvent.findMany({ where: { enable: true } })
  return {
    length: gameEventList.length,
    gameEventList,
  }
}
