import React from 'react'
import './styleNav.css'

const NavBar = () => {
  return (
    <ul className='navheader'>
        <li><a href="/">home</a></li>
        <li><a href="/create">create</a></li>
        <li><a href="/invoices">invoices</a></li>
    </ul>
  )
}

export default NavBar
