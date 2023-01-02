const dummy = (blogs) => {
  return blogs
    ? 1
    : 1
}

/** Exercise 4.4
 * Returns total likes of all given blogs. */
const totalLikes = (blogs) => {
  const summCounter = (total, index) => total + index.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(summCounter, 0)
}

/** Exercise 4.5
 * Returns the author with most likes */
const favoriteBlog = (blogs) => {

  const returnHighest = (lead, competitor) => {
    return lead.likes > competitor.likes
      ? lead
      : lead.likes === competitor.likes ? lead
        : competitor
  }
  return blogs.length === 1
    ? blogs[0]
    : blogs.reduce(returnHighest, blogs[0])
    // If there's only one blog, it is returned asap.
}

/** Exercise 4.6
 * Returns the author with most blogs */
const mostBlogs = (blogs) => {
  const authorsAndBlogs = {}

  const syncAuthors = (blog) => {
    blog.author in authorsAndBlogs
      ? authorsAndBlogs[blog.author] += 1
      : authorsAndBlogs[blog.author] = 1
  }
  blogs.forEach(syncAuthors)

  const returnHighest = (lead, competitor) => {
    return lead[1] > competitor[1]
      ? lead
      : lead[1] === competitor[1] ? lead
        : competitor
  }
  const transformedToList = Object.entries(authorsAndBlogs)
  const LeadAuthor = transformedToList.reduce(returnHighest, transformedToList[0])
  return {
    author: LeadAuthor[0],
    blogs: LeadAuthor[1]
  }
}

/** Exercise 4.7
 * Returns the author with most blogs */
const mostLikes = (blogs) => {
  const authorsAndBlogs = {}

  const syncAuthors = (blog) => {
    blog.author in authorsAndBlogs
      ? authorsAndBlogs[blog.author] += blog.likes
      : authorsAndBlogs[blog.author] = blog.likes
  }
  blogs.forEach(syncAuthors)

  const returnHighest = (lead, competitor) => {
    return lead[1] > competitor[1]
      ? lead
      : lead[1] === competitor[1] ? lead
        : competitor
  }
  const transformedToList = Object.entries(authorsAndBlogs)
  const LeadAuthor = transformedToList.reduce(returnHighest, transformedToList[0])
  return {
    author: LeadAuthor[0],
    likes: LeadAuthor[1]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}