import React from 'react'
// library
import { Link, NavLink,Outlet } from 'react-router-dom'
// icons
import { AiOutlinePoweroff } from 'react-icons/ai'
import { BiCog } from 'react-icons/bi'
import { BsBell } from 'react-icons/bs'
import { HiOutlineEnvelope } from 'react-icons/hi2'
// style
import './AdminPanel.css'

const AdminPanel = () => {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-3">
                <div className="admin__sideBar">
                <ul className='admin__sidebarLIsts'>
                    <li className='admin__sidebarItems'>
                        <Link to="/" className='admin__sidebarimgLink'> <img
                      src="/images/logo-mobile.png"
                      alt="logo site for mobile"
                      className="admin__sidebarimg"
                    /></Link>
                    </li>
                    <li className='admin__sidebarItems'>
                      <NavLink to='/adminpanel/dashboard' className={({ isActive }) =>isActive ? "admin__sideBarLink activedSidebar" : "admin__sideBarLink"}>صفحه اصلی</NavLink>     
                    </li>
                    <li className='admin__sidebarItems'>
                      <NavLink to='products' className={({ isActive }) =>isActive ? "admin__sideBarLink activedSidebar" : "admin__sideBarLink"}>محصولات</NavLink>     
                    </li>
                    <li className='admin__sidebarItems'>
                        <NavLink to='users' className={({ isActive }) =>isActive ? "admin__sideBarLink activedSidebar" : "admin__sideBarLink"}>کاربران</NavLink>
                    </li>
                    <li className='admin__sidebarItems'>
                        <NavLink to='orders' className={({ isActive }) =>isActive ? "admin__sideBarLink activedSidebar" : "admin__sideBarLink"}>سفارشات</NavLink>
                    </li>
                    <li className='admin__sidebarItems'>
                        <NavLink to='articles' className={({ isActive }) =>isActive ? "admin__sideBarLink activedSidebar" : "admin__sideBarLink"}>مقالات</NavLink>
                    </li>
                    {/* <li className='admin__sidebarItems'>
                        <NavLink to='/' className={({ isActive }) => (isActive ? 'admin__sideBarLink  admin__sideBarLink activedSidebar' :null `}>محصولات</NavLink>
                    </li> */}
                </ul>
                    
                </div>
            </div>
            <div className="col-9">
                <header className="admin__header">
                    <Link to="/" className='admin__headerLink admin__notifications' title='اطلاعیه ها'>
                        <BsBell className='admin__headerIcon'/>
                    </Link>
                    <Link to="/" className='admin__headerLink admin__notifications' title='پیام ها'>
                        <HiOutlineEnvelope className='admin__headerIcon'/>
                    </Link>
                    <Link to="/" className='admin__headerLink' title='تنظیمات'>
                        <BiCog className='admin__headerIcon'/>
                    </Link>
                   
                    <Link to="/" className='admin__headerLink' title='خروج از حساب '>
                        <AiOutlinePoweroff className='admin__headerIcon'/>
                    </Link>
                    <div className="admin__headerProfileBox">
                        <img src="/images/profile/profile.jpg" alt="" className="admin__headerProfile" />
                    </div>
                </header>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default AdminPanel