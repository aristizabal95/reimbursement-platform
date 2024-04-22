import React from 'react'
import './styleReimbursment.css'


const Reimbursment = ({info = {}, setReimbClick}) => {
  return (
    <section className='reimbsection' onClick={setReimbClick}>
        <header className='reimbheader'>
            <h3>{info.event_name}</h3>
            <div>{info.create_date}</div>
        </header>
        <section className='maininfo'>
            <div>{info.status}</div>
            <div><span>{`$${info.total_amount.toLocaleString()} ${info.currency}`}</span></div>
        </section>
    </section>
  )
}

export default Reimbursment