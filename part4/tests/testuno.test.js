const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blog = []

    const result = listHelper.dummy(blog)
    assert.strictEqual(result, 1)
  })
})
