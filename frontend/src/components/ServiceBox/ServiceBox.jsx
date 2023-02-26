import React from 'react'
import { icons } from 'react-icons/lib'
import { Link } from 'react-router-dom'
import { MdOutlineDevices } from "react-icons/md";
import { BsPrinter, BsTools } from "react-icons/bs";
import { TbDeviceTvOld } from "react-icons/tb";
import { RiHeartPulseLine } from "react-icons/ri";
import { IoMdFootball, IoIosHourglass } from "react-icons/io";

import './ServiceBox.css'
export default function ServiceBox({Icon,title,link}) {
  const icons = [
    { id: 1, title: "MdOutlineDevices",element:<MdOutlineDevices className="linkBox__icon" /> },
    { id: 2, title: "BsPrinter",element:<BsPrinter className="linkBox__icon" /> },
    { id: 3, title: "TbDeviceTvOld",element:<TbDeviceTvOld className="linkBox__icon" /> },
    { id: 4, title: "RiHeartPulseLine",element:<RiHeartPulseLine className="linkBox__icon" /> },
    { id: 5, title: "IoMdFootball",element:<IoMdFootball className="linkBox__icon" /> },
    { id: 6, title: "BsTools",element:<BsTools className="linkBox__icon" />},
  ];

  return (
    <div className='linkBox'>
    <Link className="linkBox__link" to={link}>

        <div className="linkBox__iconBox">
        { icons.map(icon=>(
          <>

{icon.title==Icon ?(icon.element):null}
          </>
)) }
        </div>
        <h4 className="linkBox__title">{title}</h4>
    </Link>
    </div>
  )
}

