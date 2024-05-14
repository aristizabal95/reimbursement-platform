import React, { useState } from 'react'
import './InvoiceForm.css'

const InvoiceForm = ({click = false, submitFun, expenseList = []}) => {
    
    const [imagePath, setImagePath] = useState('');
    const handleFileSelect = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.addEventListener("load", () => {
            const src = reader.result.replace('[data:*/*;base64,]', '');
            setImagePath(src);
        }, false);
        reader.readAsDataURL(file);
    }    

    return (
    <form onSubmit= {submitFun} className="invoiceForm" style={{display: click ? "flex": "none"}}>
            <div className="image-upload">
                <img className="invoice-preview" src={imagePath}></img>
                <label htmlFor="invoice-file">
                    <p> Upload File</p>
                </label>
                <input id="invoice-file" type="file" accept='image/*' onChange={handleFileSelect} required/>
            </div>
            <select name='expenseId' id='expenseId'>
                    {expenseList.map( (e) => {
                        return <option value={e.id}>{e.name}</option>;
                    })
                    }
            </select>
            <p className='invoice-question'>
                <label htmlFor="vendor">Vendor</label>
                <input type="text" id="vendor" name="vendor" required></input>
            </p>
            <p className='invoice-question'>
                <label htmlFor="amnt">Amount</label>
                <input type="tel" id="amnt" name="annt" required></input>
                <select name='currency' id='currency' defaultValue='USD'>
                    <option value='COP'>COP</option>
                    <option value='USD'>USD</option>
                    <option value='ARG'>ARG</option>
                </select>
            </p>
            <button className="submit-expense" type="submit">Add expense</button>
        </form>
  )
}

export default InvoiceForm
