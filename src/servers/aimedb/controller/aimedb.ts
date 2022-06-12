import aimedbService from '../services'

export default function aimedbController(req) {
  switch (req.type) {
    // 0x0001
    case 'felica_lookup':
      return aimedbService.feliCaLookup(req)

    // 0x0004
    case 'lookup':
      return aimedbService.lookup(req)

    // 0x0005
    case 'register':
      return aimedbService.register(req)

    // 0x0009
    case 'log':
      return aimedbService.log()

    // 0x000b
    case 'campaign':
      return aimedbService.campaign()

    // 0x000d
    case 'touch':
      return aimedbService.touch()

    // 0x000f
    case 'lookup2':
      return aimedbService.lookup2(req)

    // 0x0011
    case 'felica_lookup2':
      return aimedbService.feliCaLookup2(req)

    // 0x0013
    case 'unknown19':
      return aimedbService.unknown19()

    // 0x0064
    case 'hello':
      return aimedbService.hello()

    // 0x0066
    case 'goodbye':
      return aimedbService.goodbye()

    default:
      throw new Error('🚨 Unimplemented handler 🚨')
  }
}
