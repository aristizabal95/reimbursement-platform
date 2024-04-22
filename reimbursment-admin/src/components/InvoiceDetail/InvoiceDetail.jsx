import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './invoicedetail.css'
import InvoiceForm from '../InvoiceForm/InvoiceForm';

const InvoiceDetail = () => {
    const [click, setClick] = useState(false);

    const submitFun = (e) => {
        //Send form to API
        e.preventDefault();
        const data = e.target;
        console.log({
            amnt: data.amnt.value,
            vendor: data.vendor.value,
            currency: data.currency.value
        });
        setClick(!click);
    }

  return (
    <section className='invoice'>
        <button onClick = {() => setClick(!click) }className="newinv">
            <FaPlus size={25}></FaPlus>
        </button>
        <InvoiceForm submitFun={submitFun} click={click}></InvoiceForm>
    </section>);
}

export default InvoiceDetail
