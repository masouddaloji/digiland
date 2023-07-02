import { memo } from 'react'
//redux
import { nanoid } from '@reduxjs/toolkit'
//icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
//styles
import './Star.css'

const Star = memo((rating) => {
  return (
    <>
       {Array(5 - rating)
            .fill(0)
            .map((item, index) => (
              <IoIosStarOutline className="star" key={nanoid()}/>
            ))}
          {Array(rating)
            .fill(0)
            .map((item, index) => (
              <IoIosStar className="star" key={nanoid()}/>
            ))}
    </>
  )
})


export default Star