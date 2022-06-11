export default function feliCaLookup(req) {
  const num = BigInt(`0x${req.idm}`)
  let accessCode = num.toString()
  while (accessCode.length < 20) {
    accessCode = `0${accessCode}`
  }
  return {
    type: 'felica_lookup',
    status: 1,
    accessCode,
  }
}
