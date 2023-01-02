import {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser, setNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`you have logged in as a "${user.name}"`, 'success')
    } catch (exception) {
      setNotification('wrong username or password', 'error')
    }
  }

  return (
    <>
      <h3>login</h3>
      <form onSubmit={handleLogin}>
        <div>
        username:&nbsp;
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
        password:&nbsp;
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
