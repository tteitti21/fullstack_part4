const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (Object.hasOwn(request.body, 'likes')) {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else if ((!Object.hasOwn(request.body, 'title') || !Object.hasOwn(request.body, 'url'))
    && !Object.hasOwn(request.body, 'likes')) {
    response.status(400).end()
  }
  else {
    blog['likes'] = 0
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  console.log('onnistu')
  response.status(204).end()
})

module.exports = blogRouter