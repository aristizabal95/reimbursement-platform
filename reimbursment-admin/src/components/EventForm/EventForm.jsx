import React from 'react'
import './eventform.css'

const EventForm = ({display = true, eventList = [{}], submitFun}) => {
    return (
    <form onSubmit={submitFun} method="POST" className='reimbform' style={{display: display ? '' : 'none'}}>
    <ul className='select-event'>
    {
        eventList.length != 0 ? 
        eventList.map( el => {
            return (
                <li key={el.event_id}>
                <input className='event-radio' id={el.event_id}type="radio" name="event" value={el.event_id} />
                <label for={el.event_id}>{el.event_name}</label>
                </li>
            );
        }) : <></>
    }
    </ul>
    <button className="submit-event" type="submit">New event</button>
    </form>
  )
}

export default EventForm
