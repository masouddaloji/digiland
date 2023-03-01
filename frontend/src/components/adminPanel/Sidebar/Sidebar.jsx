import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
                <ul className='sidebar__lists'>
                    <li className='sidebar__items'>
                        <Link to="/" className='sidebar__imgLink'> <img
                      src="/images/logo-mobile.png"
                      alt="logo site for mobile"
                      className="sidebar__img"
                    /></Link>
                    </li>
                    <li className='sidebar__items'>
                      <NavLink to='/adminpanel/dashboard' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>صفحه اصلی</NavLink>     
                    </li>
                    <li className='sidebar__items'>
                      <NavLink to='products' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>محصولات</NavLink>     
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='users' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>کاربران</NavLink>
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='orders' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>سفارشات</NavLink>
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='articles' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>مقالات</NavLink>
                    </li>
                </ul>
                    
                </div>
  )
}

export default Sidebar