import React, { useContext } from "react";
import "./Login.css";
import { AuthContext } from "./utils";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      /*
      const resp = await axios.post("/api/login",
      JSON.stringify({username: e.target.username.value}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      })

      setAuth({'userId': resp.data.user_id, 'roleId': resp.data.role_id});
      */
      setAuth({ userId: "8", roleId: 1 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      {auth.roleId <= 3 && <Navigate to="/" replace></Navigate>}
      <form id="login-form" className="login-form" onSubmit={login}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"></input>
      </form>
      <button type="submit" form="login-form">
        Log in
      </button>
    </div>
  );
};

export default Login;
