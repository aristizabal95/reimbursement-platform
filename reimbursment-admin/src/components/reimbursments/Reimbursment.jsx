import React from 'react'
import './styleReimbursment.css'
import {Link} from "react-router-dom"


const Reimbursment = ({info = {}, setReimbClick}) => {
  return (
    <Link className="linkstyle" to={`/invoice-detail/${info.id}`}>
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
    </Link>
  )
}

export default Reimbursment