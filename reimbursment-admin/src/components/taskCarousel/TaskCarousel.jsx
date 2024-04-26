import React, { useState } from 'react'
import TaskDetail from '../taskDetail/TaskDetail';
import './taskcarousel.css'
import Summary from '../summary/Summary';

const TaskCarousel = ({detail = [], onSubmit}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === detail.length - 1 ? 0 : prevIndex + 1
        );
      };
      
      const prevSlide = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? detail.length - 1 : prevIndex - 1
        );
      };

    const carousel = <section className="carousel">
            <button onClick={prevSlide} className='btn prev'>&lt;</button>
            <TaskDetail detail={detail[activeIndex]}></TaskDetail>
            <button onClick={nextSlide} className='btn next'>&gt;</button>
            <Summary onSubmit={onSubmit} detail={detail}></Summary>
        </section>
    
    return (detail.length != 0 ? carousel : <></>);
        
}

export default TaskCarousel
