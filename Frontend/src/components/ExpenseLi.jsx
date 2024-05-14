import React from 'react'
import './ExpenseLi.css'

const ExpenseLi = ({expense}) => {
  return (
    <li key={expense.id} className='expenseli'>
        <h1>{expense.vendor}</h1>
        <p>{(+expense.amount).toLocaleString()} <span>{expense.currency}</span></p>
    </li>
  )
}

export default ExpenseLi


