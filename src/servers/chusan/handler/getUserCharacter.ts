import prisma from '../services/db'

function paginationCookie(list, params) {
  if (list.length < params.maxCount) {
    return -1
  }
  else {
    return params.nextIndex + params.maxCount
  }
}

export default async function getUserCharacter(req) {
  const maxCount = parseInt(req.body.maxCount)
  const nextIndex = parseInt(req.body.nextIndex)
  const userCharacterList = await prisma.chusanUserCharacter.findMany(
    {
      where: { userId: BigInt(req.userId) },
      take: maxCount,
      skip: nextIndex,
    })
  return {
    userId: req.userId,
    length: userCharacterList.length,
    nextIndex: paginationCookie(userCharacterList, { maxCount, nextIndex }),
    userCharacterList,
  }
}
