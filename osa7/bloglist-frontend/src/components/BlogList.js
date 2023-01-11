import BlogForm from './BlogForm'
import {useRef} from 'react'
import {Link} from 'react-router-dom'
import Togglable from './Togglable'
import Table from 'react-bootstrap/Table'

const BlogList = ({setBlogs, blogs, setNotification}) => {
  const blogFormRef = useRef()
  return (
    <>
      <h4>bloglist</h4>
      <div className="buttonMargin">
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm setBlogs={setBlogs} setNotification={setNotification} blogFormRef={blogFormRef} blogs={blogs} />
        </Togglable>
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
