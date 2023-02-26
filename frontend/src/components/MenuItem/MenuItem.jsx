import React from 'react'
import { useState,useEffect } from 'react'
import { BsFolder } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";


import './MenuItem.css'
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';


export default function MenuItem({category}) {
  const categoryLocation=useParams()

    const [isShowSubMenu,setIsShowSubMenu]=useState(false)
  return (
    <div className='menuItem' onClick={()=>setIsShowSubMenu(!isShowSubMenu)} >

   <span className={`${categoryLocation.categoryName===category.shortLink ? "acvtive":null}`}>
   <BsFolder className="menuItem__itemIcon" />
    {category.title}
   </span>
  {
    category.sub_categories.data.length ?
    <>
    {!isShowSubMenu ? 
    <AiOutlinePlusCircle className={`menuItem__openIcon `} /> :
           <AiOutlineMinusCircle className="menuItem__closeIcon" /> }
           <ul className={`menuItem__subLists ${
              isShowSubMenu && "menuItem__subLists--show"
            }`}>
            {category.sub_categories.data.map(subCategory=>(
                <li className="menuItem__subItem">{subCategory.attributes.title}</li>
            ))}
            
          </ul>
    </>
    :null
  }
   
    </div>
  )
}
