import {connect} from 'react-redux'

const Notification = ({notification}) => {
  if (!notification) {
    return null
  }

  const style = notification.type === 'success'
    ? 'notification success'
    : notification.type === 'error'
      ? 'notification error'
      : 'like'

  return (
    <div className={style}>
      {notification.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
