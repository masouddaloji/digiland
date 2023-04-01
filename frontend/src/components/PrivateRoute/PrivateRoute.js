import React from 'react'
// packages
import {useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
//hooks
import useAuth from '../../hooks/useAuth'

const PrivateRoute = ({children}) => {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const decode= jwtDecode(auth?.token)
    const role=decode?.role
    console.log("role",role)

  return (
    <>
    {auth?.token && role==="admin"||auth?.token && role==="superAdmin"?<>{children} </>:navigate("/login")}
    </>
  )
}

export default PrivateRoute