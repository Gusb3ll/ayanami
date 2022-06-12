import { Router } from 'express'
// import format from 'date-fns/format'

import chusanHandler from '../handler'

const chusanRouter = Router()

chusanRouter.post('/GameLoginApi', (req, res) => {
  return res.status(200).json(chusanHandler.gameLogin(req))
})

chusanRouter.post('/GameLogoutApi', (_req, res) => {
  return res.status(200).json(chusanHandler.gameLogout())
})

chusanRouter.post('/GetGameChargeApi', (_req, res) => {
  return res.status(200).json(chusanHandler.getGameCharge())
})

chusanRouter.post('/GetGameEventApi', (_req, res) => {
  return res.status(200).json(chusanHandler.getGameEvent())
})

chusanRouter.post('/GetGameIdlistApi', (req, res) => {
  return res.status(200).json(chusanHandler.getGameIdlist(req))
})

chusanRouter.post('/GetGameRankingApi', (req, res) => {
  return res.status(200).json(chusanHandler.getGameRanking(req))
})

chusanRouter.post('/GetGameSettingApi', (_req, res) => {
  return res.status(200).json(chusanHandler.getGameSetting())
})

chusanRouter.post('/GetTeamCourseRuleApi', (req, res) => {
  return res.status(200).json(chusanHandler.getTeamCourseRule(req))
})

chusanRouter.post('/GetTeamCourseSettingApi', (req, res) => {
  return res.status(200).json(chusanHandler.getTeamCourseSetting(req))
})

chusanRouter.post('/GetUserActivityApi', (req, res) => {
  return res.status(200).json(chusanHandler.getUserActivity(req))
})

export default chusanRouter
