import LoginForm from './LoginForm'

const Login = ({user, setUser, showNotification}) => {

  return (
    <div>
      {!user &&
        <LoginForm setUser={setUser} showNotification={showNotification} />
      }
    </div>
  )
}

export default Login
