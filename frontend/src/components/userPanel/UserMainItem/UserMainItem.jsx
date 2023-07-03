
//styles
import './UserMainItem.css'


const UserMainItem = ({title,count,icon}) => {
  return (
    <div className='userItem ss02'>
        <span>{count}</span>
        <p>{title}</p>
        {icon}
    </div>
  )
}

export default UserMainItem