import {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs, showNotification, blogFormRef, blogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogObject = {
    title: title,
    author: author,
    url: url,
    likes: 0
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
    showNotification(`blog "${title}" created`, 'success')
  }

  return (
    <>
      <h3>create new</h3>
      <form id="blog-form" onSubmit={addBlog}>
        <div>
        title:&nbsp;
          <input
            id="input-title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
        author:&nbsp;
          <input
            id="input-author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:&nbsp;
          <input
            id="input-url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit" className="buttonMargin">create</button>
      </form>
    </>
  )
}

export default BlogForm
