import { useContext, useEffect, useState } from 'react';
import { AuthContext, fetchData } from '../utils';
import './neweventform.css'

const NewEventForm = () => {
    const [clickNew, setClickNew] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const {auth} = useContext(AuthContext);

    const createEvent = (e) => {
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
        setClickNew(!clickNew)
    }

    const addExpense = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    useEffect( () => {
            fetchData(`/api/available-events/${auth.user_id}`, setEventList)
    }, [clickNew])

    
    return (
        <section className='new-event-page'>
            {eventList.length != 0 ?
        eventList.map((el) => {
            return (<div className='event-header'>
                <h3>{el.title}</h3>
                <p>{el.budget}</p>
            </div>);
        }) : <></>
        }
        <button className='new-event-button' onClick={() => setClickNew(!clickNew)}>+</button>
        <form className='create-event' onSubmit={createEvent} style={{display: clickNew ? '' : 'none'}}>
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
        {
            expenseList != 0 ? 
            expenseList.map( (el) => {
                return <p>{el.name}, {el.budget}, {el.desc}</p>;
            }) : <></>
        }
        <fieldset className='new-expense-form'>
            <legend>New expense</legend>
            <lable htmlFor="name">Name</lable>
            <input type="text" id="name" name="name"/>
            <lable htmlFor="budget-exp">Budget</lable>
            <input type="text" id="budget-exp" name="budget-exp"/>
        </fieldset>
        <input type="submit"></input>
    </form>
    </section>
  )
}

export default NewEventForm
