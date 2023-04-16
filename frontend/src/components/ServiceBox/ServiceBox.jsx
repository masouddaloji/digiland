import React from 'react'
// library
import { Link } from 'react-router-dom'


import './ServiceBox.css'
export default function ServiceBox({icon,title,link}) {

  return (
    <Link className="linkBox__link" to={link}>
        <div className="linkBox__iconBox">
          {icon}
        </div>
        <h4 className="linkBox__title">{title}</h4>
    </Link>

  )
}

