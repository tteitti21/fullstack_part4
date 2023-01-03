const { URL } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/routes')
const middleware = require('./utils/middleware')
const { cmd, cmdE } = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(URL)
  .then(() => {
    cmd('connected to MongoDB')
  })
  .catch((error) => {
    cmdE('failed to connect', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app