import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './invoicedetail.css'
import InvoiceForm from '../InvoiceForm/InvoiceForm';
import { useParams } from 'react-router-dom';
import {fetchData} from '../utils.js'

const InvoiceDetail = () => {
    const [click, setClick] = useState(false);
    const [invoiceList, setInvoiceList] = useState([]);
    const {reimbursmentId} = useParams();

    //TODO get it from the context
    const userId = 'ago1' 

    useEffect(() => {
        fetchData(`/api/invoice-list/${userId}`, setInvoiceList)
    }, []);
    
    
    const submitFun = async (e) => {
        //Send form to API
        e.preventDefault();
        const formData = new FormData();
        const data = e.target;
        formData.append( 'info',
            JSON.stringify({
                reimbursment_id: reimbursmentId,
                amnt: data.amnt.value,
                vendor: data.vendor.value,
                currency: data.currency.value
            })
        );
        formData.append('invoice', data['invoice-file'].files[0])
        console.log(formData);
        
        await fetch('/api/new-invoice', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then( r => r.json());;
        setClick(!click);
        fetchData(`/api/invoice-list/${userId}`, setInvoiceList)
    };

  return (
    <section className='invoice'>
        {invoiceList.length != 0 ? invoiceList.map( (el) => {
            return (
                <div key={el.invoice_id}>
                    <h1>{el.vendor}</h1>
                    <p>{el.amnt} <span>{el.currency}</span></p>
                </div>
            );
        }) : <></>}
        <button onClick = {() => setClick(!click) } className="newinv">
            <FaPlus size={25}></FaPlus>
        </button>
        <InvoiceForm submitFun={submitFun} click={click}></InvoiceForm>
    </section>);
}

export default InvoiceDetail
