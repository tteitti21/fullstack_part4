// npm test -- -t "<matcher>"
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('Tests that invalid username/password cant be added', () => {
  test('Username must be 3 or more characters', async () => {
    const newUser =
    {
      'username': 'TT',
      'name': 'Tino',
      'password': 'salainensana'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.error.text).toBe('{"error":"Invalid username. Input at least 3 characters"}')
  })


  test('Password must be 3 or more characters', async () => {
    const newUser =
    {
      'username': 'TTTT',
      'name': 'Tino',
      'password': 'sa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.error.text).toBe('{"error":"Invalid password. Input at least 3 characters"}')
  })

  test('Username must be defined', async () => {
    const newUser =
    {
      'name': 'Tino',
      'password': 'salainensana'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.error.text).toBe('{"error":"Invalid username. Input at least 3 characters"}')
  })


  test('Password must be defined', async () => {
    const newUser =
    {
      'username': 'TTTT',
      'name': 'Tino',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.error.text).toBe('{"error":"Invalid password. Input at least 3 characters"}')
  })
})

afterAll(() => {
  mongoose.connection.close()
})