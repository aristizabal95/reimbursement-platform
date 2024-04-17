import React from 'react'
import './summary.css'

const Summary = ({detail = []}) => {
    const total = (detail.length != 0 ? detail.reduce((acc, val) => acc + val.amnt, 0) : 0);
    const TotalElement = (
    <div className='summarytotal'>
        <p>{total} <span>COP</span></p>
    </div>);
    return (
    <form className='summaryform'>
        {
        (detail.length != 0 ? detail.map( (el) => {
            return (
                <div className='summaryitem' key={`summary${el.id}`}>
                    <p>{el.vendor}</p>
                    <input key={`input${el.id}`} defaultValue={el.amnt}></input>
                    <span>{el.currency}</span>
                </div>
            );
        }
        ): <></>)
        }
        {(total != 0 ? TotalElement: <></>)}
    </form>
  )
}

export default Summary
