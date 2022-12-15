const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'www.example.com',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'www.example.com',
    likes: 5
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

module.exports = {initialBlogs, nonExistingId, blogsInDb}
