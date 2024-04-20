import { FaPlus } from "react-icons/fa6";
import React from 'react'
import './newreimbursment.css'

const NewReimbursment = ({clickFun}) => {
  return (
  <button className="newreimb" onClick={clickFun}>
    <FaPlus size={25}></FaPlus>
  </button>
  )
}

export default NewReimbursment
