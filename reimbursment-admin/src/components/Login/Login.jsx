import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login-container'>
        <form id="login-form" className='login-form'>
            <label htmlFor='username'>Username</label>
            <input type="text" id="username" name="username"></input>
            <label htmlFor='username'>Password</label>
            <input type="password" id="password" name="password"></input>
        </form>
        <button type="submit" form="login-form">Log in</button>
    </div>
  )
}

export default Login
