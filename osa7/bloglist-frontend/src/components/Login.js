import LoginForm from './LoginForm'

const Login = ({user, setUser, setNotification}) => {

  return (
    <div>
      {!user &&
        <LoginForm setUser={setUser} setNotification={setNotification} />
      }
    </div>
  )
}

export default Login
