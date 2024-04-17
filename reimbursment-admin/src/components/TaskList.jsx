import React, { useState, useEffect } from 'react'
import Task from './task/Task';
import './tasklist.css'
import {fetchData} from './utils.js';
import TaskCarousel from './taskCarousel/TaskCarousel.jsx';

const TaskList = () => {

    const [info, setInfo] = useState([]);
    const [reimbId, SetReimbId] = useState('1');
    const [detail, setDetail] = useState([]);
    
    useEffect( () => {
        fetchData('/api/task-list', setInfo);
    }, [])

    useEffect( () => {
        try {
            fetchData('/api/task-detail/' + reimbId, setDetail);
        } catch (error) {
            console.log(error);
        }
    }, [reimbId]);

    return (
        <section className='mainpanel'>
            <section className='tasklist'>
                {info.map( (el) => (
                    <Task key= {el.id} info= {el} setReimbClick={() => SetReimbId(el.id)}></Task>
                ))}
            </section>
        <TaskCarousel detail={detail}></TaskCarousel>
        </section>
  )
}

export default TaskList
