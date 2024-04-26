import React from 'react'
import './expenseli.css'

const ExpenseLi = ({expense}) => {
  return (
    <li key={expense.invoice_id} className='expenseli'>
        <h1>{expense.vendor}</h1>
        <p>{(+expense.amnt).toLocaleString()} <span>{expense.currency}</span></p>
    </li>
  )
}

export default ExpenseLi


