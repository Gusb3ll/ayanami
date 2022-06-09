import compression from 'compression'
import express from 'express'

// import createSqlWrapper from '../sql'
import { quirks, trace } from '../utils'

// import gameLogin from '../services/gameLogin'

export default function chunithm() {
  // const wrapper = createSqlWrapper(db)

  // wrapper.rpc('/GameLoginApi', gameLogin)
  // wrapper.rpc('/GameLogoutApi', gameLogout)
  // wrapper.rpc('/GetGameChargeApi', getGameCharge)
  // wrapper.rpc('/GetGameEventApi', getGameEvent)
  // wrapper.rpc('/GetGameIdlistApi', getGameIdlist)
  // wrapper.rpc('/GetGameMessageApi', getGameMessage)
  // wrapper.rpc('/GetGameRankingApi', getGameRanking)
  // wrapper.rpc('/GetGameSaleApi', getGameSale)
  // wrapper.rpc('/GetGameSettingApi', getGameSetting)
  // wrapper.rpc('/GetUserActivityApi', getUserActivity)
  // wrapper.rpc('/GetUserCharacterApi', getUserCharacter)
  // wrapper.rpc('/GetUserChargeApi', getUserCharge)
  // wrapper.rpc('/GetUserCourseAPi', getUserCourse)
  // wrapper.rpc('/GetUserDataApi', getUserData)
  // wrapper.rpc('/GetUserDataExApi', getUserDataEx)
  // wrapper.rpc('/GetUserDuelApi', getUserDuel)
  // wrapper.rpc('/GetUserFavoriteMusicApi', getUserFavoriteMusic)
  // wrapper.rpc('/GetUserItemApi', getUserItem)
  // wrapper.rpc('/GetUserMapApi', getUserMap)
  // wrapper.rpc('/GetUserMusicApi', getUserMusic)
  // wrapper.rpc('/GetUserOptionApi', getUserOption)
  // wrapper.rpc('/GetUserOptionExApi', getUserOptionEx)
  // wrapper.rpc('/GetUserPreviewApi', getUserPreview)
  // wrapper.rpc('/GetUserRecentPlayerApi', getUserRecentRating)
  // wrapper.rpc('/GetUserRecentRatingApi', getUserRecentRating)
  // wrapper.rpc('/GetUserRegionApi', getUserRegion)
  // wrapper.rpc('/UpsertClientBookkeepingApi', upsertClientBookkeeping)
  // wrapper.rpc('/UpsertClientDevelopApi', upsertClientDevelop)
  // wrapper.rpc('/UpsertClientErrorApi', upsertClientError)
  // wrapper.rpc('/UpsertClientSettingApi', upsertClientSetting)
  // wrapper.rpc('/UpsertClientTestmodeApi', upsertClientTestmode)
  // wrapper.rpc('/UpsertUserAllApi', upsertUserAll)
  // wrapper.rpc('/UpsertUserChargelogApi', upsertUserChargelogApi)

  const app = express()

  app.use(quirks)
  app.use(compression({ threshold: 0 }))
  app.use(express.json({ limit: '50mb' })) // that ought to be enough
  app.use(trace)

  app.use('/ChuniServlet')

  return app
}
