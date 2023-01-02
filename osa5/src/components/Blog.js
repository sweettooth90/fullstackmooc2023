import {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, user, loggedUser, likeBlog, deleteBlog}) => {
  const {title, author, url, likes} = blog
  const [open, setOpen] = useState(false)

  return (
    <>
      {!open
        ? <div data-testid="blog-title">{title} - {author} <button id="view-button" onClick={() => setOpen(true)}>view</button></div>
        : <div data-testid="open-blog">
          <div>
            {title} - {author} <button onClick={() => setOpen(false)}>hide</button>
          </div>
          <div>
            {url}
          </div>
          <div>
            likes {likes} <button id="like-button" onClick={() => likeBlog(blog)}>like</button>
          </div>
          {user &&
            <div>
              {user.name}
            </div>
          }
          {user && loggedUser.username === user.username &&
            <div>
              <button id="remove-button" onClick={() => deleteBlog(blog)}>remove</button>
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