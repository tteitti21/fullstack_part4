const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    __v: 0
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const allBlogs = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = allBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('Tests that content-type is JSON and all the blogs are included', () => {
  test('blogs are fetched from a different database', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  })
})

describe('Tests every block entry for correct attribute name', () => {
  test('tests that id is not named _id', async () => {

    const response = await api.get('/api/blogs')
    response.body.forEach( (b) => expect(b.id, b.title, b.author, b.url, b.likes).toBeDefined())
  })
})

describe('Posted blogs must have all attributes and length of array increased', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Tino Teittinen',
      url: 'http://howToWriteaBlog.com//firstBlog.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const newNumberOfBlogs = await api.get('/api/blogs')
    newNumberOfBlogs.body.forEach( (blog) => expect(blog.id).toBeDefined())
    expect(newNumberOfBlogs.body).toHaveLength(initialBlogs.length + 1)

    const titles = newNumberOfBlogs.body.map(n => n.title)
    expect(titles).toContain(
      'New blog'
    )
  })
})
afterAll(() => {
  mongoose.connection.close()
})