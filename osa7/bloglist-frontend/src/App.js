import {useState, useEffect} from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const showNotification = (text, type) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

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
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <BlogList user={user} setUser={setUser} setNotification={showNotification} />
    </div>
  )
}

export default App
