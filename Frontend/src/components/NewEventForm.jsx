import { useContext, useEffect, useState } from 'react';
import { AuthContext, fetchData } from './utils';
import './NewEventForm.css'
import axios from 'axios';

const NewEventForm = () => {
    const [clickNew, setClickNew] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const {auth} = useContext(AuthContext);

    const createEvent = async (e) => {
        e.preventDefault();
        const data = e.target;
        const event = await axios.post("/api/event",
        JSON.stringify({
            title: data.title.value,
            center_of_costs: data.center_of_costs.value,
            budget: data.budget.value,
            currency: data.currency.value,
            ends_at: data.ends_at.value
        }),{ headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }});
        const ee = expenseList.map( (el) => {
            return {event_id: event.data.id, ...el};
        });
        const expense = await axios.post("/expense", JSON.stringify(ee));
        setClickNew(!clickNew)
        setExpenseList([])
    }

    const addExpense = (e) => {
        e.preventDefault();
        console.log(e.target.form);
        const newExpense = {'budget': e.target.form['budget-exp'].value, 'name': e.target.form['expense-name'].value, 'desc': e.target.form.desc.value};
        setExpenseList([...expenseList, newExpense])
    }

    useEffect( () => {
            fetchData(`/available-events/${auth.user_id}`, setEventList)
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
            <label htmlFor="title">Name</label>
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
            <label htmlFor="currency">Currency</label>
            <select name='currency' id='currency' defaultValue='USD'>
                <option value='COP'>COP</option>
                <option value='USD'>USD</option>
                <option value='ARG'>ARG</option>
            </select>
        </p>
        <p>
            <label htmlFor="ends_at">End date to submit reimbursments</label>
            <input type="date" id="ends_at" name="ends_at"/>
        </p>
        <form id="add-expense" className='new-expense-form'>
        {
            expenseList != 0 ? 
            expenseList.map( (el) => {
                return <p>{el.name}, {el.budget} {el.desc}</p>;
            }) : <></>
        }
            <legend>New expense</legend>
            <label htmlFor="expense-name">Name</label>
            <input type="text" id="expense-name" name="expense-name"/>
            <label htmlFor="budget-exp">Budget</label>
            <input type="text" id="budget-exp" name="budget-exp"/>
            <label htmlFor="desc">Description</label>
            <input type="text" id="desc" name="desc"/>
            <button form="add-expense" type="button" onClick={addExpense}>Add expense</button>
        </form>
        <input type="submit"></input>
    </form>
    </section>
  )
}

export default NewEventForm
