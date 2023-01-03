const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are fetched from a different database', async () => {

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

})

afterAll(() => {
  mongoose.connection.close()
})