import React from 'react'
import './reimbform.css'

const ReimbForm = ({display = true, eventList = [{}], submitFun}) => {
    return (
    <form onSubmit={submitFun} method='post' className='reimbform' style={{display: display ? '' : 'none'}}>
        <fieldset>
        <legend>New Event</legend>
        <p>
            <label htmlFor="event">name</label>
            <select name="event" id="event">
                {
                    eventList.length != 0 ? 
                    eventList.map( el => {
                        return <option value={el.event_id}>{el.event_name}</option>;
                    }) : <></>
                }
            </select>
        </p>
        <p>
            <label htmlFor='currency'>Default currency</label>
            <select name='currency' id='currency'>
                <option value='COP'>COP</option>
                <option value='USD'>USD</option>
                <option value='ARG'>ARG</option>
            </select>
        </p>
        </fieldset>
        <button className='submitEvent' type="submit">Create Event</button>
    </form>
  )
}

export default ReimbForm
