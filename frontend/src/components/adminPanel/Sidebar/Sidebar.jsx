import React from 'react'
<<<<<<< HEAD
// library
import { Link, NavLink } from 'react-router-dom'
// icons
import { HiOutlineUser } from 'react-icons/hi'
import { RiArticleLine, RiHomeSmileLine } from 'react-icons/ri'
import { BsBoxSeam } from 'react-icons/bs'
// styles
import './Sidebar.css'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
=======
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7

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
<<<<<<< HEAD
                      <NavLink to='/adminpanel/dashboard' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>
                      <RiHomeSmileLine className='sidebar__icon'/>
                      صفحه اصلی</NavLink>     
                    </li>
                    <li className='sidebar__items'>
                      <NavLink to='products' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>
                      <BsBoxSeam className='sidebar__icon'/>
                      محصولات</NavLink>     
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='users' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>
                        <HiOutlineUser className='sidebar__icon'/>
                        کاربران</NavLink>
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='orders' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>
                        <MdOutlineAddShoppingCart className='sidebar__icon'/>
                        سفارشات</NavLink>
                    </li>
                    <li className='sidebar__items'>
                        <NavLink to='articles' className={({ isActive }) =>isActive ? "sidebar__link activedSidebar" : "sidebar__link"}>
                        <RiArticleLine className='sidebar__icon'/>
                        مقالات</NavLink>
=======
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
>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7
                    </li>
                </ul>
                    
                </div>
  )
}

export default Sidebar