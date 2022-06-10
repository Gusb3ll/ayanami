import { Router } from 'express'

const chuniRouter = Router()

chuniRouter.use('/GetGameSettingApi', (_req, res) => {
  res.status(200).json({ returnCode: '1' })
})

export default chuniRouter
