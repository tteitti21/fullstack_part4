const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

// GET
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// POST
blogRouter.post('/', async (request, response) => {
  const blog = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const preparedBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  if (Object.hasOwn(request.body, 'likes')) {
    const savedBlog = await preparedBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  else if ((!Object.hasOwn(request.body, 'title')
    || !Object.hasOwn(request.body, 'url'))
    && !Object.hasOwn(request.body, 'likes')) {
    response.status(400).end()
  }
  else {
    preparedBlog['likes'] = 0
    const savedBlog = await preparedBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

// DELETE
blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() !== user.id.toString() ) {
    return response.status(403).json({ error: 'You dont have rights to delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// PUT
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.
    findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter