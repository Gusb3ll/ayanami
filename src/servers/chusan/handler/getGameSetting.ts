import format from 'date-fns/format'

export default function getGameSetting() {
  const rebootStartTime = new Date()
  rebootStartTime.setHours(rebootStartTime.getHours() - 3)

  const rebootEndTime = new Date()
  rebootEndTime.setHours(rebootEndTime.getHours() - 2)

  return {
    gameSetting: {
      romVersion: '2.00.01',
      dataVersion: '2.00.00',
      isMaintenance: false,
      requestInterval: 0,
      rebootStartTime: format(rebootStartTime, 'yyyy-MM-dd HH:mm:ss'),
      rebootEndTime: format(rebootEndTime, 'yyyy-MM-dd HH:mm:ss'),
      isBackgroundDistribute: false,
      maxCountCharacter: 300,
      maxCountItem: 300,
      maxCountMusic: 300,
      matchStartTime: format(rebootStartTime, 'yyyy-MM-dd HH:mm:ss'),
      matchEndTime: format(rebootEndTime, 'yyyy-MM-dd HH:mm:ss'),
      matchTimeLimit: 10,
      matchErrorLimit: 1,
      matchingUri: `http://${process.env.HOST_EXT}:${process.env.PORT_CHUSAN}/ChusanServlet/`,
      udpHolePunchUri: `http://${process.env.HOST_EXT}:${process.env.PORT_CHUSAN}/ChusanServlet/`,
      reflectorUri: `http://${process.env.HOST_EXT}:${process.env.PORT_CHUSAN}/ChusanServlet/`,
    },
    isDumpUpload: false,
    isAou: false,
  }
}
