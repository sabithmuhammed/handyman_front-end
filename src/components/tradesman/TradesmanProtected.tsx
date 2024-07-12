import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Navigate, Outlet } from 'react-router-dom'

const TradesmanProtected = () => {
    const {tradesmanInfo} = useSelector((state:RootState)=>state.auth)
  return (
    tradesmanInfo?<Outlet /> : <Navigate to={"/tradesman/register"} />
  )
}

export default TradesmanProtected
