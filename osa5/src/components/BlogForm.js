import {useState} from 'react'

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const add = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h3>create new</h3>
      <form id="blog-form" onSubmit={add}>
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
        <button id="create-button" type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
