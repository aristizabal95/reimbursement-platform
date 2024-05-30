import React, { useContext } from "react";
import { AuthContext } from "./utils";
import signUpGoogle from "../assets/sign-up-google.svg";
import factoredLogo from "../assets/factored-logo-text-primary.svg";
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
    <div className="container mx-auto m-10 items-center flex flex-col">
      <img src={factoredLogo} className="w-[300px]"></img>
      {auth.roleId <= 3 && <Navigate to="/" replace></Navigate>}
      <form id="login-form" className="login-form" onSubmit={login}></form>
      <button type="submit" form="login-form">
        <img src={signUpGoogle}></img>
      </button>
    </div>
  );
};

export default Login;
