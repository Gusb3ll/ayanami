import { Router } from 'express'
// import format from 'date-fns/format'

import chusanHandler from '../handler'

const chusanRouter = Router()

chusanRouter.use('./GameLoginApi', (req, res) => {
  return res.status(200).json(chusanHandler.gameLogin(req))
})

chusanRouter.use('./GameLogoutApi', (_req, res) => {
  return res.status(200).json(chusanHandler.gameLogout())
})

chusanRouter.use('./GetGameChargeApi', (_req, res) => {
  return res.status(200).json(chusanHandler.getGameCharge())
})

chusanRouter.use('./GetGameEventApi', (_req, res) => {
  return res.status(200).json(chusanHandler.getGameEvent())
})

export default chusanRouter
