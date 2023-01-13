import {Link} from 'react-router-dom'

const Users = ({users}) => {

  if (!users) {
    return null
  }

  return (
    <div>
      <h4>Users</h4>
      {users.map(user =>
        <table key={user.id}>
          <tbody>
            <tr>
              <th>User</th>
              <th>Blogs created</th>
            </tr>
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="tableStyling">
                {user.blogs.length}
              </td>
            </tr>
          </tbody>
        </table>
      )
      }
    </div>
  )
}

export default Users
