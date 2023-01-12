import {useState} from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {Form} from 'react-bootstrap'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em 0 1em 0;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const LoginForm = ({setUser, showNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showNotification(`you have logged in as a "${user.name}"`, 'success')
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  return (
    <>
      <h4>login</h4>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <Button variant="primary" id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm
