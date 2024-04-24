import React from 'react'
import './reimbform.css'

const ReimbForm = ({display = true, eventList = [{}], submitFun}) => {
    return (
    <form onSubmit={submitFun} method="POST" className='reimbform' style={{display: display ? '' : 'none'}}>
    {
        eventList.length != 0 ? 
        eventList.map( el => {
            return (
                <p className='event-option'>
                <input className='event-radio' id={el.event_id}type="radio" name="event" value={el.event_id} />
                <lable for={el.event_id}>{el.event_name}</lable>
                </p>
            );
        }) : <></>
    }
    <button className="submit-event" type="submit">New event</button>
    </form>
  )
}

export default ReimbForm
