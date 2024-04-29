import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserHome from '../pages/user/UserHome'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path='' index element={<UserHome />} />
    </Routes>
  )
}

export default UserRoutes
