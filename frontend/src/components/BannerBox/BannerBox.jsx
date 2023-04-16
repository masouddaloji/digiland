import React from 'react'
import { Link } from 'react-router-dom'
import './BannerBox.css'

function BannerBox(props) {
    // const {cover,link}=props
  return (
    <div className="widget__imageBox">
    <Link className="widget__link" to={props?.link}>
      <img
        src={props?.cover}
        alt="banner img"
        className="widget__img"
      />
    </Link>
  </div>
  )
}

export default BannerBox