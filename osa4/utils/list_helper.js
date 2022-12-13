const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
}

const mostBlogs = (blogs) => {
  const blog =
    _.chain(blogs)
      .countBy('author')
      .entries()
      .maxBy()
      .value()

  const result = {
    author: _.head(blog),
    blogs: _.last(blog)
  }
  return result
}

const mostLikes = (blogs) => {
  const result =
    _.maxBy(
      _.chain(blogs)
        .groupBy('author')
        .map((author, name) => ({
          author: name,
          likes: _.sumBy(author, 'likes')
        })
        )
        .value(),
      'likes'
    )
  return result
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}
