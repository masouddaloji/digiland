import React from 'react'
//packages
import { useNavigate } from 'react-router-dom'

const useNavigation = () => {

    const navigate=useNavigate()

    const goToLogin=()=>{
        navigate("/login")
    }
  return goToLogin
}

export default useNavigation