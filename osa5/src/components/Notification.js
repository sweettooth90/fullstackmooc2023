const Notification = ({notification}) => {
  if (notification === null) {
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

export default Notification
