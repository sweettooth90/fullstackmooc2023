import {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Blog = ({blog, user, loggedUser, likeBlog, deleteBlog}) => {
  const {title, author, url, likes} = blog
  const [open, setOpen] = useState(false)

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0em 0.5em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `

  return (
    <>
      {!open
        ? <div data-testid="blog-title">{title} - {author} <Button id="view-button" onClick={() => setOpen(true)}>view</Button></div>
        : <div data-testid="open-blog">
          <div>
            {title} - {author} <Button onClick={() => setOpen(false)}>hide</Button>
          </div>
          <div>
            {url}
          </div>
          <div>
            likes {likes} <Button id="like-button" onClick={() => likeBlog(blog)}>like</Button>
          </div>
          {user &&
            <div>
              {user.name}
            </div>
          }
          {user && loggedUser.username === user.username &&
            <div>
              <Button id="remove-button" onClick={() => deleteBlog(blog)}>remove</Button>
            </div>
          }
        </div>
      }
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog