import {useState, useEffect} from 'react'
import {Routes, Route, useMatch} from 'react-router-dom'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Login from './components/Login'
import Blog from './components/Blog'
import './index.css'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    userService.getAllUsers().then(users => setUsers(users))
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const showNotification = (text, type) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const matchBlog = useMatch('/blogs/:id')
  const showBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  const matchUser = useMatch('/users/:id')
  const showUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Menu user={user} setUser={setUser} setNotification={showNotification} />
      <Notification notification={notification} />
      <Login user={user} setUser={setUser} setNotification={showNotification} />
      <Routes>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={showNotification}
          />
        } />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={showUser} />} />
        <Route path="/blogs/:id" element={
          <Blog
            blog={showBlog}
            setBlogs={setBlogs}
            setNotification={showNotification}
            loggedUser={user}
            user={user}
          />
        } />
      </Routes>
    </div>
  )
}

export default App
