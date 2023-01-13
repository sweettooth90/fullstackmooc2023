import {useDispatch} from 'react-redux'
import {deleteBlog, addLikeToBlog, initializeBlogs} from '../reducers/blogReducer'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  padding: 0em 0.5em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Blog = ({blog, loggedUser, user, showNotification}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const addLike = async (blog) => {
    await dispatch(addLikeToBlog(blog.id, {likes: blog.likes + 1}))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await dispatch(deleteBlog(blog.id))
      dispatch(initializeBlogs())
      showNotification(`blog "${blog.title}" removed`, 'success')
      navigate('/')
    }
  }

  return (
    <>
      <h3>{blog.title}</h3>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        likes {blog.likes} <Button id="like-button" onClick={() => addLike(blog)}>like</Button>
      </div>
      {user && user.name &&
        <div>added by {user.name}</div>
      }
      {user && loggedUser.name === user.name &&
        <div>
          <Button id="remove-button" onClick={() => removeBlog(blog)}>remove</Button>
        </div>
      }
    </>
  )
}

export default Blog
