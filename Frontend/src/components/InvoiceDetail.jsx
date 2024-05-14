import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './InvoiceDetail.css'
import InvoiceForm from './InvoiceForm.jsx';
import { useParams } from 'react-router-dom';
import {fetchData} from './utils.jsx'
import ExpenseLi from './ExpenseLi.jsx';

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
        formData.append("reimbursment_id", reimbursmentId);
        formData.append("amnt", data.amnt.value);
        formData.append("vendor", data.vendor.value);
        formData.append("currency", data.currency.value);
        formData.append('invoice', data['invoice-file'].files[0]);
        await fetch('/api/new-invoice', {
            method:'POST',
            body: formData
        })
        setClick(!click);
        fetchData(`/api/invoice-list/${userId}`, setInvoiceList)
    };

  return (
    <section className='invoice'>
        <ul>
        {invoiceList.length != 0 ? 
        invoiceList.map( (el) => <ExpenseLi expense={el}></ExpenseLi>) :<></>
        }
        </ul>
        <button onClick = {() => setClick(!click) } className="newinv">
            <FaPlus size={25}></FaPlus>
        </button>
        <InvoiceForm submitFun={submitFun} click={click}></InvoiceForm>
    </section>);
}

export default InvoiceDetail