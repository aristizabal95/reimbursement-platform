import React, { useState, useEffect } from 'react';
import Reimbursment from '../reimbursments/Reimbursment';
import { FaPlus } from "react-icons/fa6";

import './reimbursmentList.css'

import { fetchData } from '../utils';
import EventForm from '../EventForm/EventForm';

const ReimbursmentList = () => {
    const [clickNew, setClickNew] = useState(false);
    const [availableEvents, setAvailableEvent] = useState([{}]);
    const [eventSubmitted, setEventSubmitted] = useState(0);
    const [myEvents, setMyEvents] = useState([]);
    const userId = 'ago1';

    useEffect(() => {
        fetchData('/api/available-events', setAvailableEvent)
    }, []);

    useEffect(() => {
        fetchData(`/api/my-event-list/${userId}`, setMyEvents)
    }, [eventSubmitted]);

    const reloadAndSubmit = (e) => {
        e.preventDefault();
        
        const data = e.target;
        fetch('/api/add-event', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_id: data.event.value,
                user_id: userId
            })
        })
        .then( r => r.json());
        setEventSubmitted(eventSubmitted + 1);
        setClickNew(!clickNew);
    }

    return (
        <section className='reimb-home'>
        <section style={{display: clickNew ? 'none': ''}}>
        {
            (myEvents.length != 0 ? myEvents.map( el => {
                return <Reimbursment key={el.event_id} info={el}></Reimbursment>;
            }) : <></>)
        }
        </section>
        <button className="newreimb" onClick={() => setClickNew(!clickNew)}>
            <FaPlus size={25}></FaPlus>
        </button>
        <EventForm submitFun={reloadAndSubmit} display={clickNew} eventList={availableEvents}>
        </EventForm>
        </section>
    )
  
}

export default ReimbursmentList
