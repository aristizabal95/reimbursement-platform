import React from 'react'
import './styleNav.css'

const NavBar = () => {
  return (
    <header className='navheader'>
        <section className='title-menu'>
            <h1>Welcome</h1>
            <button className='hamburger-button'>
                <div className='hamburger'></div>
            </button>
        </section>

        <nav className='navbar'>
            <ul>
                <li>home</li>
                <li>create</li>
                <li>other thing</li>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar
