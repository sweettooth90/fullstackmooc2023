const User = ({user}) => {

  if (!user) {
    return null
  }

  return (
    <>
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map((blog, i) =>
          <li key={i}>
            {blog.title}
          </li>
        )}
      </ul>
    </>
  )
}

export default User
