import React from 'react'
import './invoiceform.css'

const InvoiceForm = ({click = false, submitFun}) => {
  return (
    <form onSubmit= {submitFun} className="invoiceForm" style={{display: click ? "flex": "none"}}>
            <div className="image-upload">
                <label htmlFor="file-input">
                    <p> Upload File</p>
                </label>
                <input id="file-input" type="file" accept='image/*'/>
            </div>
            <p className='invoice-question'>
                <label htmlFor="amnt">Amount</label>
                <input type="tel" id="amnt" name="annt" required></input>
            </p>
            <p className='invoice-question'>
                <label htmlFor="vendor">Vendor</label>
                <input type="text" id="vendor" name="vendor" required></input>
            </p>
            <p className='invoice-question'>
                <label htmlFor="currency">Currency</label>
                <select name='currency' id='currency'>
                    <option value='COP'>COP</option>
                    <option value='USD' selected="selected">USD</option>
                    <option value='ARG'>ARG</option>
                </select>
            </p>
            <input type="submit"></input>
        </form>
  )
}

export default InvoiceForm
