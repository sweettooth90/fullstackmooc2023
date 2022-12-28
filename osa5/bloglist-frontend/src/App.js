import loginService from './services/login'
import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  /* const [showAll, setShowAll] = useState(true) */
  // const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('wrong credentials')
      alert('wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => {
    return (
    <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title:&nbsp;
      <input
        value={title}
        onChange={({target}) => setTitle(target.value)}
      />
      author:&nbsp;
      <input
        value={author}
        onChange={({target}) => setAuthor(target.value)}
      />
      url:&nbsp;
      <input
        value={url}
        onChange={({target}) => setUrl(target.value)}
      />
      <button type="submit">save</button>
    </form>
    </>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {/* <Notification message={errorMessage} /> */}
      {user === null
        ? <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        : <div>
          <p>
            {user.name} logged in <button onClick={handleLogOut}>logout</button>
          </p>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
