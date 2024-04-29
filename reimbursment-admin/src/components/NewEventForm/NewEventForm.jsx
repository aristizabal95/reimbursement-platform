import React, { useState } from 'react'
import './neweventform.css'

const NewEventForm = ({onSubmit}) => {
  const [clickNew, setClickNew] = useState(false);
    return (
    <section className='new-event-page'>
        <button className='new-event-button' onClick={() => setClickNew(!clickNew)}>
        +
        </button>
    <form className='create-event' onSubmit={onSubmit} style={{display: clickNew ? '' : 'none'}}>
    <p>
        <label htmlFor="title">Event Name</label>
        <input type="text" id="title" name="title"/>
    </p>
    <p>
        <label htmlFor="center_of_costs">Cost Center</label>
        <input type="text" id="center_of_costs" name="center_of_costs"/>
    </p>
    <p>
        <label htmlFor="budget">Budget by person</label>
        <input type="tel" id="budget" name="budget"/>
    </p>
    <p>
        <label htmlFor="end_dt">End date to submit reimbursments</label>
        <input type="date" id="end_dt" name="end_dt"/>
    </p>
    <input type="submit"></input>
   </form>
    </section>
    
  )
}

export default NewEventForm
