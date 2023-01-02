const app = require('./app')
const http = require('http')
const { PORT } = require('./utils/config')
const { cmd } = require('./utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  cmd(`Server running on port ${PORT}`)
})