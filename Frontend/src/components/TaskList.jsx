import React, { useState, useEffect } from 'react'
import Task from './Task.jsx';
import './TaskList.css'
import {fetchData} from './utils.jsx';
import TaskCarousel from './TaskCarousel.jsx';

const TaskList = () => {

    const [info, setInfo] = useState([]);
    const [reimbId, SetReimbId] = useState('all');
    const [detail, setDetail] = useState([]);
    
    useEffect( () => {
        fetchData('/task-list', setInfo);
    }, [])

    useEffect( () => {
        try {
            fetchData('/task-detail/' + reimbId, setDetail);
        } catch (error) {
            console.log(error);
        }
    }, [reimbId]);

    const focusTask = (el) => {
        if (el.id == reimbId) {
            SetReimbId("all");
        } else {
            SetReimbId(el.id);
        }
    }

    const approve = (e) => {
        e.preventDefault();
        SetReimbId("all");
    }

    return (
        <section className='mainpanel'>
            <section className='tasklist'>
                {info.map( (el) => (
                    <Task key= {el.id} info= {el} setReimbClick={() => focusTask(el)} selectedId={reimbId}></Task>
                ))}
            </section>
        <TaskCarousel onSubmit={approve} detail={detail}></TaskCarousel>
        </section>
  )
}

export default TaskList
