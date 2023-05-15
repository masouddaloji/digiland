//icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
//styles
import './Star.css'

const Star = (rating) => {
  return (
    <>
       {Array(5 - rating)
            .fill(0)
            .map((item, index) => (
              <IoIosStarOutline className="star" />
            ))}
          {Array(rating)
            .fill(0)
            .map((item, index) => (
              <IoIosStar className="star" />
            ))}
    </>
  )
}

export default Star