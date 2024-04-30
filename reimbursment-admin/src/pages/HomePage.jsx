import React, { useContext } from 'react'
import ReimbursmentList from '../components/reimbursmentList/ReimbursmentList'
import { AuthContext } from '../components/utils'
import Login from '../components/Login/Login'


const HomePage = () => {
    const { auth } = useContext(AuthContext)
    return auth == null ? <ReimbursmentList></ReimbursmentList> : <Login></Login>
}

export default HomePage
