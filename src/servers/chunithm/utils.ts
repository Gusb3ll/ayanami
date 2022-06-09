export function quirks(req, res, next) {
  if (req.headers['x-debug'] === undefined) {
    req.headers['accept-encoding'] = 'deflate'
  }
  return next()
}

export function trace(req, res, next) {
  console.log('\n--- Chunithm %s ---\n', req.url)
  console.log('Request: %j', req.body)

  const prevJson = res.json

  res.json = function (obj) {
    console.log('Response: %j', obj)

    res.json = prevJson
    // eslint-disable-next-line prefer-rest-params
    res.json.apply(this, arguments)

    return res
  }

  return next()
}
