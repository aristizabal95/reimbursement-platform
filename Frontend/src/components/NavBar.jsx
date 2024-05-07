import React from 'react'
import './NavBar.css'
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <ul className='navheader'>
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/task"> Task </Link></li>
        <li><Link to="/add-event"> Events </Link></li>
    </ul>
  )
}

export default NavBar
