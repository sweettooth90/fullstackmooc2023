import BlogForm from './BlogForm'
import {useSelector} from 'react-redux'
import {useRef} from 'react'
import {Link} from 'react-router-dom'
import Togglable from './Togglable'
import Table from 'react-bootstrap/Table'

const BlogList = ({showNotification, user}) => {
  const blogFormRef = useRef()
  const blogs = useSelector(state => [...state.blogs])

  if (!blogs) {
    return null
  }

  return (
    <>
      <h4>bloglist</h4>
      <div className="buttonMargin">
        {user &&
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              showNotification={showNotification}
              blogFormRef={blogFormRef}
              blogs={blogs}
            />
          </Togglable>
        }
      </div>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id} className="blogList">
                <td>
                  <div data-testid="blog-title">
                    <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
                  </div>
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