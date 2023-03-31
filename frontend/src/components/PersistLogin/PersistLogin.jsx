import React,{useEffect} from 'react'
// packages
import { Outlet } from 'react-router-dom'
// hooks
import useAuth from '../../hooks/useAuth'
import useRefreshToken from '../../hooks/useRefreshToken'

const PersistLogin = () => {
    const {auth}=useAuth()
    const refresh=useRefreshToken()
    useEffect(()=>{
        const verifyLogin=async()=>{
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            }
        }
        !auth?.token && verifyLogin()
    },[])
  return (
    <>
    {auth?.token?<Outlet/>:<p>not login</p>}
    
    </>
  )
}

export default PersistLogin