const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Tests that content-type is JSON and all the blogs are included', () => {
  test('blogs are fetched from a different database', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

describe('Tests every block entry for correct attribute name', () => {
  test('tests that id is not named _id', async () => {

    const response = await api.get('/api/blogs')
    response.body.forEach( (blog) => expect(blog.id).toBeDefined())
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})