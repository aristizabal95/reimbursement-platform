import React from "react";
import successIcon from "../assets/success-icon.svg";

const SuccessButton = ({ onClick, text, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex text-white justify-center bg-[#4EAF51] rounded-[20px] ${className}`}
    >
      <p>{text}</p>
      <img className="pl-4" src={successIcon}></img>
    </button>
  );
};

export default SuccessButton;
