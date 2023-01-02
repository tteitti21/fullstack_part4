const blogRouter = require('express').Router()
const Blog = require('../models/blog')
console.log('huia')
blogRouter.get('/', (request, response) => {
  console.log('heui')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter