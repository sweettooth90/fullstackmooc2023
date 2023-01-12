import blogService from '../services/blogs'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  padding: 0em 0.5em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Blog = ({blog, loggedUser, user, setBlogs, showNotification}) => {
  if (!blog) {
    return null
  }

  const likeBlog = () => {
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

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          blogService.getAll().then(blogs => setBlogs(blogs))
        })
      showNotification(`blog "${blog.title}" removed`, 'success')
    }
  }

  return (
    <>
      <h3>{blog.title}</h3>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        likes {blog.likes} <Button id="like-button" onClick={() => likeBlog(blog)}>like</Button>
      </div>
      {user && user.name &&
        <div>added by {user.name}</div>
      }
      {user && loggedUser.name === user.name &&
        <div>
          <Button id="remove-button" onClick={() => deleteBlog(blog)}>remove</Button>
        </div>
      }
    </>
  )
}

export default Blog
