import React from "react";
import "./NavBar.css";
import factorLogo from "../assets/factored-logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="navheader">
      <li>
        <img src={factorLogo} className="factored-logo"></img>
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
