import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/nav/NavBar'

const MainLayout = () => {
  return <>
    <NavBar></NavBar>
    <Outlet></Outlet>
  </>;
}

export default MainLayout
