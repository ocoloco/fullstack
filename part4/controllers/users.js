const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { _id, username, name, password } = request.body

  if (password){
    if (password.length >= 3){
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        _id,
        username,
        name,
        passwordHash,
      })

      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } else {
      response.status(400).json({ error: 'password too short' })
    }
  } else {
    response.status(400).json({ error: 'no password' })
  }
})

module.exports = usersRouter
