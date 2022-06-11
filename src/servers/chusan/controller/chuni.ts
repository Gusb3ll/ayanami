import { Router } from 'express'
import format from 'date-fns/format'

import { CHARGE_IDS } from '../static/charge'
import { EVENT_IDS } from '../static/event'

const chuniRouter = Router()

chuniRouter.use('/GetGameLoginApi', (_req, res) => {
  return res.status(200).json({ returnCode: '1' })
})

chuniRouter.use('/GetGameLogoutApi', (_req, res) => {
  return res.status(200).json({ returnCode: '1' })
})

chuniRouter.use('/GetGameChargeApi', (_req, res) => {
  const gameChargeList = []
  for (const [i, charge] of CHARGE_IDS.entries()) {
    gameChargeList.push({
      chargeId: charge.id.toString(),
      orderId: (i + 1).toString(),
      price: charge.price.toString(),
      salePrice: charge.salePrice.toString(),
      startDate: '2017-12-05 07:00:00.0',
      endDate: '2029-12-31 23:59:59.0',
      saleStartDate: '2017-12-05 07:00:00.0',
      saleEndDate: '2030-12-31 23:59:59.0',
    })
  }
  return res.status(200).json({ length: gameChargeList.length.toString(), gameChargeList })
})

chuniRouter.use('/GetGameEventApi', (req, res) => {
  const gameEventList = []
  for (const id of EVENT_IDS) {
    gameEventList.push({
      type: req.body.type,
      id: id.toString(),
      startDate: '2017-12-05 07:00:00.0',
      endDate: '2099-12-31 00:00:00.0',
    })
  }
  return res.status(200).json({ type: req.body.type, length: gameEventList.length.toString(), gameEventList })
})

chuniRouter.use('/GetGameIdlistApi', (req, res) => {
  return res.status(200).json({ type: req.body.type, length: '0', gameIdlistList: [] })
})

chuniRouter.use('/GetGameMessageApi', (req, res) => {
  return res.status(200).json({ type: req.body.type, length: '0', gameMessageList: [] })
})

chuniRouter.use('/GetGameRankingApi', (req, res) => {
  return res.status(200).json({ type: req.body.type, gameRankingList: [] })
})

chuniRouter.use('/GetGameSaleApi', (req, res) => {
  return res.status(200).json({ type: req.body.type, length: '0', gameSaleList: [] })
})

chuniRouter.use('/GetGameSettingApi', (_req, res) => {
  const rebootStartTime = new Date()
  const rebootEndTime = new Date()
  rebootStartTime.setHours(rebootStartTime.getHours() - 3)
  rebootEndTime.setHours(rebootEndTime.getHours() - 2)

  return res.status(200).json({
    gameSettings: {
      dataVersion: '1',
      isMaintenance: 'false',
      requestInterval: '10',
      rebootStartTime: format(rebootStartTime, 'yyyy-MM-dd HH:mm:ss'),
      rebootEndTime: format(rebootEndTime, 'yyyy-MM-dd HH:mm:ss'),
      isBackgroundDistribute: 'false',
      maxCountCharacter: '300',
      maxCountItem: '300',
      maxCountMusic: '100',
    },
    isDumpUpload: 'false',
    isAou: 'true',
  })
})

export default chuniRouter
