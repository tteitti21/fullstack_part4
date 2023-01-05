const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, blog) => {
    blog.id = blog._id.toJSON()
    delete blog._id
    delete blog.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)