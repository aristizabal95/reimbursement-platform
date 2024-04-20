import React, { useState, useEffect } from 'react';
import Reimbursment from '../reimbursments/Reimbursment';
import NewReimbursment from '../newReimbursment/NewReimbursment';
import ReimbForm from '../ReimbForm/ReimbForm';
import { fetchData } from '../utils';

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
                user_id: userId,
                create_date: new Date().getTime(),
                default_currency: data.currency.value
            })
        })
        .then( r => r.json());
        setEventSubmitted(eventSubmitted + 1);
        setClickNew(!clickNew);
    }

    const clickPlus = (e) => {
        setClickNew(!clickNew);
    }

    return (
        <>
        <section style={{display: clickNew ? 'none': ''}}>
        {
            (myEvents.length != 0 ? myEvents.map( el => {
                return <Reimbursment key={el.event_id} info={el}></Reimbursment>;
            }) : <></>)
        }
        </section>
        <NewReimbursment clickFun = {clickPlus}></NewReimbursment>
        <ReimbForm submitFun={reloadAndSubmit} display={clickNew} eventList={availableEvents}>
        </ReimbForm>
        </>
    )
  
}

export default ReimbursmentList
