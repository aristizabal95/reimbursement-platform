import React, { useState } from 'react'
import NewEventForm from '../components/NewEventForm/NewEventForm';

const CreateEvent = () => {
    const [clickNew, setClickNew] = useState("")

    const create_event = (e) => {
        e.preventDefault();
        const data = e.target;
        fetch('/api/add-event', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: data.title.value,
                center_of_costs: data.center_of_costs.value,
                budget: data.budget.value,
                end_dt: data.end_dt.value
            })
        })
        .then( r => r.json());
    }
    return (
    <NewEventForm onSubmit={create_event} display={clickNew ? "flex":"none"}></NewEventForm>
    );
}

export default CreateEvent
