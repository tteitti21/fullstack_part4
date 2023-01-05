const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = request.body

  const user = await User.findById(blog.user)
  console.log('hui2')
  console.log(user)
  const preparedBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  if (Object.hasOwn(request.body, 'likes')) {
    console.log('hui')
    const savedBlog = await preparedBlog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(savedBlog._id)
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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

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