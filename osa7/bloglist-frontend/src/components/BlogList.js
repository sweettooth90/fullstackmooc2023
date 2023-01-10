import {useState, useEffect, useRef} from 'react'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import LoginForm from './LoginForm'
import Blog from './Blog'
import Togglable from './Togglable'
import Table from 'react-bootstrap/Table'

const BlogList = ({user, setUser, setNotification}) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification('blog created', 'success')
        blogFormRef.current.toggleVisibility()
      })
  }

  const likeBlog = (blog) => {
    blogService
      .update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null
      })
      .then(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
      })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          blogService.getAll().then(blogs => setBlogs(blogs))
          setNotification('Blog removed', 'success')
        })
    }
  }

  const handleLogOut = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification('you have logged out', 'success')
  }

  return (
    <>
      <div>
        {user === null
          ? <LoginForm setUser={setUser} setNotification={setNotification} />
          : <>
            {user.name} logged in <button onClick={handleLogOut}>logout</button>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm addBlog={addBlog} />
            </Togglable>
          </>
        }
      </div>

      <h3>bloglist</h3>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id} className="blogList">
                <td>
                  <Blog
                    blog={blog}
                    loggedUser={user}
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                  />
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
