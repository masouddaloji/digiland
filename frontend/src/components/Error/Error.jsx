import React from 'react'
// styles
import './Error.css'

const Error = ({title}) => {
  return (
    <div className='error__wrapper'>
        <p className="error__title">{title}</p>
    </div>
  )
}

export default Error