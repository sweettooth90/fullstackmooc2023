const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
/* const User = require('../models/user')
const jwt = require('jsonwebtoken') */
const {userExtractor} = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const {title, author, url, likes} = request.body
  const user = request.user
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes === undefined ? 0 : likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(update)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({error: 'Delete failed'})
  }
})

module.exports = blogsRouter
