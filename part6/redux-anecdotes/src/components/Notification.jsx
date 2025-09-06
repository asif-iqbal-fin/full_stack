import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationMessage = useSelector(({notification}) => {return notification})
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification