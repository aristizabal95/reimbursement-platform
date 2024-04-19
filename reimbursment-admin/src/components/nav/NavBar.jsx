import React from 'react'
import './styleNav.css'

const NavBar = () => {
  return (
    <ul className='navheader'>
        <li><a href="/">home</a></li>
        <li><a href="/task">tasks</a></li>
        <li><a href="/events">events</a></li>
    </ul>
  )
}

export default NavBar
