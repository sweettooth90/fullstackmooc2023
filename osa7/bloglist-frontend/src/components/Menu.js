import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 0.85em;
  padding: 0 0.25em 0 0.25em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Menu = ({user, setUser, setNotification}) => {

  const handleLogOut = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotification('you have logged out', 'success')
  }

  return (
    <div className="menu">
      <div className="menuItem"><Link to="/">Blogs</Link></div>
      <div className="menuItem"><Link to="/users">Users</Link></div>
      {user &&
        <div className="menuItem">
          {user.name} logged in <Button onClick={handleLogOut}>logout</Button>
        </div>
      }
    </div>
  )
}

export default Menu
