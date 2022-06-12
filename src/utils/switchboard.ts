export const PORT_IDZ = {
  USERDB: {
    TCP: 10000,
    HTTP: 10001,
  },
  MATCH: {
    TCP: 10002,
    UDP_SEND: 10003,
    UDP_RECV: 10004,
  },
  TAG_MATCH: {
    TCP: 10005,
    UDP_SEND: 10006,
    UDP_RECV: 10007,
  },
  EVENT: 10008,
  SCREENSHOT: 10009,
  ECHO1: 10010,
  ECHO2: 10011,
}

const startupHosts = new Map<string, string>()

startupHosts.set('SDDF', `${process.env.HOST_EXT}:${PORT_IDZ.USERDB.TCP}`)

const startupUris = new Map<string, string>()

// Chunithm Paradise Lost and below
startupUris.set('SDBT', `http://${process.env.HOST_EXT}:${process.env.PORT_CHUNITHM}/ChuniServlet/`)

// Chunithm New and above
startupUris.set('SDHD', `http://${process.env.HOST_EXT}:${process.env.PORT_CHUSAN}/ChusanServlet/`)

export function startupHost(model: string): string {
  const val = startupHosts.get(model)
  return val !== undefined ? val : ''
}

export function startupUri(model: string): string {
  const val = startupUris.get(model)
  return val !== undefined ? val : ''
}
