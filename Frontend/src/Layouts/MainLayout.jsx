import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  return <>
    <NavBar></NavBar>
    <Outlet></Outlet>
  </>;
}

export default MainLayout
