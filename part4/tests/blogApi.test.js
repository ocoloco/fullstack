const { test, describe,  after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// Cambiar el Token antes de realizar cualquier prueba,
// usuario debe estar autentificado

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
  })

  test('the first blog is about React Pattens', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title)
    assert(title.includes('React patterns'))
  })

  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
      const blogAtStart = await helper.blogsInDb()

      const blogToView = blogAtStart[0]
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('invalid token not blog added ', async () => {

      const newblog = {
        _id: '5a422b891b54a676234d17f1',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 20,
      }

      await api
        .post('/api/blogs')
        .send(newblog)
        .expect(401) //no token
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('a valid blog can be added ', async () => {

      const newblog = {
        _id: '5a422b891b54a676234d17f2',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 20,
      }

      await api
        .post('/api/blogs')
        .send(newblog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      assert(blogsAtEnd[blogsAtEnd.length-1].title.includes('TDD harms'))
    })

    test('a blog without likes can be added as 0 likes', async () => {
      const newblog = {
        _id: '5a422b891b54a676234d17f3',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      }

      await api
        .post('/api/blogs')
        .send(newblog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[blogsAtEnd.length-1].likes, 0)
    })

    test('blog without title is not added', async () => {
      const newblog = {
        author: 'sin titulo',
        url: 'aaaa',
        likes: 10,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newblog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without URL is not added', async () => {
      const newBlog = {
        title: 'TD22D harms architecture',
        author: 'Robert C. Martin',
        likes: 10,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length , helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('invalid user id not delete the blog', async () => {
      const blogAtStart = await helper.blogsInDb()
      const blogToDelete = blogAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('a blog can be deleted', async () => {
      const blogAtStart = await helper.blogsInDb()
      const blogToDelete = blogAtStart[1]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, blogAtStart.length - 1)
    })
  })

  describe('Update of a blog', () => {
    test('Update a blog likes to be 1', async () => {
      const blogAtStart = await helper.blogsInDb()
      const updateBlog = blogAtStart[0]

      updateBlog.likes = 1 //Supongamos que es Admin

      await api
        .put(`/api/blogs/${updateBlog.id}`)
        .send(updateBlog)
        .set('Authorization', `Bearer ${helper.token}`)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[0].likes, 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
