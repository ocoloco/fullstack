const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.deepStrictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.blogs.slice(0,1))
    assert.deepStrictEqual(result, 7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    assert.deepStrictEqual(result, 36)
  })
})

describe('favorites', () => {
  const favorito = {
    title:'Canonical string reduction',
    author:'Edsger W. Dijkstra',
    likes: 12
  }

  const mostBlogs = {
    author:'Robert C. Martin',
    blogs: 3
  }

  const mostLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('favorite blog entry', () => {
    const result = listHelper.favoriteBlog(listHelper.blogs)
    assert.deepStrictEqual(result,favorito)
  })

  test('name with the most blogs created', () => {
    const result = listHelper.mostBlogs(listHelper.blogs)
    assert.deepStrictEqual(result,mostBlogs)
  })

  test('name with most likes', () => {
    const result = listHelper.mostLikes(listHelper.blogs)
    assert.deepStrictEqual(result,mostLikes)
  })

})
