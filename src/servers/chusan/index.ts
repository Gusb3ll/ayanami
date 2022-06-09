import express from 'express'

const app = express()
app.use('/ChuniServlet', (req, res) => {
  console.log(req.url)
  res.send('hi')
})

export default app
