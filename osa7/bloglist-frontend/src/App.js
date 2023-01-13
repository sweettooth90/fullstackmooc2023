import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Routes, Route, useMatch} from 'react-router-dom'
import {initializeBlogs} from './reducers/blogReducer'
import {initializeUsers} from './reducers/userReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import Notification from './components/Notification'
import {handleNotification} from './reducers/notificationReducer'
import Menu from './components/Menu'
import Login from './components/Login'
import Blog from './components/Blog'
import './index.css'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  const showNotification = (text, type) => {
    dispatch(handleNotification({text, type}))
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
      <Menu user={user} setUser={setUser} showNotification={showNotification} />
      <Notification />
      <Login user={user} setUser={setUser} showNotification={showNotification} />
      <Routes showNotification={showNotification}>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
            showNotification={showNotification}
            user={user}
          />
        } />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={showUser} />} />
        <Route path="/blogs/:id" element={
          <Blog
            blog={showBlog}
            loggedUser={user}
            user={user}
            showNotification={showNotification}
          />
        } />
      </Routes>
    </div>
  )
}

export default App
