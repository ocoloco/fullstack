const jwt = require('jsonwebtoken')

const getTokenFrom = request => {

  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
module.exports =  (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  request.userId = decodedToken.id

  next()
}
