import React, { useState } from "react";
import factorLogo from "../assets/factored-logo.svg";
import rightArrow from "../assets/right-arrow.svg";
import diamond from "../assets/diamond-icon.svg";
import taskIcon from "../assets/task-icon.svg";
import receiptIcon from "../assets/receipt-icon.svg";
import menu from "../assets/menu.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  const linkMargin = "mb-5";
  return (
    <nav className="p-4 mr-1 flex flex-col justify-between items-center left-0 top-0 shadow-nav h-[100vh] w-[78px]">
      <section className="flex flex-col items-center content-evenly">
        <img src={factorLogo} className="mb-8 h-[42px] w-[36px]"></img>
        <Link className={linkMargin} to="/task">
          <img src={taskIcon}></img>
        </Link>
        <Link className={linkMargin} to="/">
          <img src={receiptIcon}></img>
        </Link>
        <Link className={linkMargin} to="/add-event">
          <img src={diamond}></img>
        </Link>
      </section>
      <section className="flex-reversed">
        <Link className={linkMargin} to="/">
          <img src={menu}></img>
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;

/*
position: absolute;
left: 0%;
right: 73.29%;
top: 0%;
bottom: 0%;
box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.06);
*/
