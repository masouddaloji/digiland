import { memo } from 'react'
//redux
import { nanoid } from '@reduxjs/toolkit'
//icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
//styles
import './Star.css'

<<<<<<< HEAD
const Star =(rating) => {
=======
const Star = memo((rating) => {
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
  return (
    <>
       {Array(5 - rating)
            .fill(0)
            .map((item) => (
              <IoIosStarOutline className="star" key={nanoid()}/>
            ))}
          {Array(rating)
            .fill(0)
            .map((item) => (
              <IoIosStar className="star" key={nanoid()}/>
            ))}
    </>
  )
})



export default Star