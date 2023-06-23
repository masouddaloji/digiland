//packages
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
//redux
import { selectToken } from "../../../features/auth/authSlice";


const RequiredLogin = () => {
    const location = useLocation()
const token=useSelector(selectToken)

    const content = (
       token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}

export default RequiredLogin;
