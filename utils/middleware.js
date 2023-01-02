const { cmd, cmdE } = require('./logger')

const requestLogger = (request, response, next) => {
  cmd('Method:', request.method)
  cmd('Path:  ', request.path)
  cmd('Body:  ', request.body)
  cmd('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  cmdE(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ errorMessage: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ errorMessage: 'Validation failed. Min 3 chars' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}