import React, { useEffect, useState } from 'react'
import './Summary.css'

const Summary = ({detail = [], onSubmit}) => {
    const defaultTotal = (detail.length != 0 ? detail.reduce((acc, v) => acc + v.amnt, 0): 0);
    var amountsInit = (detail.length != 0 ? detail.map( el => ({k: `input${el.id}`, v: el.amnt + 0})): [{}]);
    const [amounts, setAmounts] = useState(amountsInit)
    const [total, setTotal] = useState(defaultTotal);
    
    const TotalElement = (
    <div className='summarytotal'>
        <p>{total} <span>COP</span></p>
    </div>);

    const changeInput = (e) => {
        const key = e.target.id;
        const newVal = +e.target.value;
        setAmounts((prevState) => {
            return prevState.map( el => (el.k == key ? {k: key, v: newVal}:el));
        });
    }

    useEffect( () => {
        const newTotal = amounts.reduce((acc, el) => acc + el.v, 0)
        setTotal(newTotal);
    }, [amounts])

    return (
    <form className='summaryform' onSubmit={onSubmit}>
        {
        (detail.length != 0 ? detail.map( (el) => {
            return (
                <div className='summaryitem' id={`summary${el.id}`}>
                    <p>{el.vendor}</p>
                    <input type="tel" id={`input${el.id}`} defaultValue={el.amnt} onChange={changeInput}></input>
                    <span>{el.currency}</span>
                </div>
            );
        }
        ): <></>)
        }
        {TotalElement}
        <button className="approve" type="submit">Approve</button>
    </form>
  )
}

export default Summary