import React from 'react'
import useAuth from './context/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes:React.FC = () => {

    const {isAuth} = useAuth()

    if(!isAuth) return <Navigate to='/' replace/>
    return <Outlet/>

}

export default ProtectedRoutes
