import React, { useContext } from 'react'
import './Login.css'
import { AuthContext } from '../utils'
import axios from 'axios';

const Login = () => {
  
  const {setAuth} = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/login", 
      JSON.stringify({username: e.target.username.value}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      })
      setAuth(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='login-container'>
        <form id="login-form" className='login-form' onSubmit={login}>
            <label htmlFor='username'>Username</label>
            <input type="text" id="username" name="username"></input>
        </form>
        <button type="submit" form="login-form">Log in</button>
    </div>
  )
}

export default Login
