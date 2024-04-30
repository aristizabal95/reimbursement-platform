import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../utils'


const RequiereAuth = () => {

    const { auth } = useContext(AuthContext);
    const location = useLocation();

  return ( 
        auth.role_id <= 3 ? 
        <Outlet></Outlet> : <Navigate to='/login' state ={{from: location}} replace></Navigate>
  )
}

export default RequiereAuth
