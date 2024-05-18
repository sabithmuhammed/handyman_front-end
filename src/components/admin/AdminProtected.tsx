import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtected = () => {
    const {adminInfo} = useSelector((state:RootState)=>state.auth)
  return (
    adminInfo?<Outlet /> : <Navigate to={"/login"} />
  )
}

export default AdminProtected
