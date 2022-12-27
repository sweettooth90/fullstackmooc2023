const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '63aab4c91d3f51c177bd02e4',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'www.example.com',
    likes: 7,
    __v: 0
  },
  {
    _id: '63a9fad18d003af6d09fc504',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'www.example.com',
    likes: 5,
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'www.example.com',
      likes: 7
    }
  )
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
