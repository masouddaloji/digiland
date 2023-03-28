import {useContext} from 'react'
// contexts
import {AuthContext} from "../Context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth