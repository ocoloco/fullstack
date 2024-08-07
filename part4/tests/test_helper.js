const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f0',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '667befb399c8bb5d3c5ac904',
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f1',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '667befb399c8bb5d3c5ac903',
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '667befb399c8bb5d3c5ac903',
    username: 'sapo',
    name: 'David',
    passwordHash: '$2b$10$6OggXqUZtHlMwhZD/M2tDeiTLulP1q6sB8u.5sqQ/BxotEzRCX6yG',
    blogs: '5a422a851b54a676234d17f1'
  },
  {
    _id: '667befb399c8bb5d3c5ac904',
    username: 'root',
    name: 'Admin',
    passwordHash: '$2b$10$6OggXqUZtHlMwhZD/M2tDeiTLulP1q6sB8u.5sqQ/BxotEzRCX6yG',
    blogs: '5a422a851b54a676234d17f0'
  }
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'deleteme', url:'deleteme' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}
