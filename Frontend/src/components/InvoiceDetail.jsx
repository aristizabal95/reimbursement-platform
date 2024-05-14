import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import './InvoiceDetail.css'
import InvoiceForm from './InvoiceForm.jsx';
import { useParams } from 'react-router-dom';
import {AuthContext, fetchData} from './utils.jsx'
import ExpenseLi from './ExpenseLi.jsx';

const InvoiceDetail = () => {
    const [click, setClick] = useState(false);
    const [invoiceList, setInvoiceList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const {reimbursmentId} = useParams();

    const {auth} = useContext(AuthContext)    

    useEffect(() => {
        fetchData(`/invoice-list/${auth.userId}`, setInvoiceList)
        fetchData(`/expenses/${reimbursmentId}`, setExpenseList)
    }, []);

    const submitFun = async (e) => {
        //Send form to API
        e.preventDefault();
        const formData = new FormData();
        const data = e.target;
        formData.append("reimbursment_id", reimbursmentId);
        formData.append("expense_id", data.expenseId.value)
        formData.append("amnt", data.amnt.value);
        formData.append("vendor", data.vendor.value);
        formData.append("currency", data.currency.value);
        formData.append('invoice', data['invoice-file'].files[0]);
        await fetch('/new-invoice', {
            method:'POST',
            body: formData
        })
        setClick(!click);
        fetchData(`/invoice-list/${auth.userId}`, setInvoiceList)
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
        <InvoiceForm submitFun={submitFun} click={click} expenseList={expenseList}></InvoiceForm>
    </section>);
}

export default InvoiceDetail
