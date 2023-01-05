const { cmd, cmdE } = require('./logger')

const requestLogger = (request, response, next) => {
  cmd('Method:', request.method)
  cmd('Path:  ', request.path)
  cmd('Body:  ', request.body)
  cmd('Token: ', request.token)
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

/** Gets authorization header from the request and checks whether
 * it starts with Bearer or not.*/
const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}