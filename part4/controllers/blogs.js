const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/userExtractor')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog)
    response.json(blog)
  else
    response.status(404).end()
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const { userId } = request
  const user = await User.findById(userId)

  const blog = new Blog({
    _id: body._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {

  const { userId } = request
  const user = await User.findById(userId)

  const blogToDelete = await Blog.findById(request.params.id)

  //No se comparan 2 objectsid de mangodb
  if (blogToDelete.user.toString() === user._id.toString())
  {
    await Blog.findByIdAndDelete(request.params.id)
    // Actualizar usuario

    const blogsToUpdate = user.blogs.filter(
      (i) => {
        return (i.toString() !== request.params.id)
      }
    )
    await User.updateOne({ _id: user._id, blogs: blogsToUpdate })

    response.status(204).end()
  }
  response.status(400).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

module.exports = blogRouter
