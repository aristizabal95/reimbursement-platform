import React from 'react'
import './styleTask.css'


const Task = ({info = {}, setReimbClick}) => {

  return (
    <section className='tasksection' onClick={setReimbClick}>
        <header className='taskheader'>
            <h3>{info.name}</h3>
            <div>{info.date}</div>
        </header>
        <section className='maininfo'>
            <div>{info.concept}</div>
            <div><span>{`$${info.amount.toLocaleString()} ${info.currency}`}</span></div>
        </section>
    </section>
  )
}

export default Task