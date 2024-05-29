import React from "react";
import factorLogo from "../assets/factored-logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="flex justify-evenly align-center m-1 p-1 bg-blue">
      <li>
        <img src={factorLogo} className=""></img>
      </li>
      <li>
        <Link to="/"> Home </Link>
      </li>
      <li>
        <Link to="/task"> Task </Link>
      </li>
      <li>
        <Link to="/add-event"> Events </Link>
      </li>
    </ul>
  );
};

export default NavBar;
