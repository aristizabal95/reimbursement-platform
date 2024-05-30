import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./utils.jsx";

const InvoiceForm = () => {
  const { reimbursementId, eventId } = useParams();
  const [imagePath, setImagePath] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    fetchData(`/expenses/expenses?event_id=${eventId}`, setExpenseList);
  }, []);

  const handleFileSelect = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const src = reader.result.replace("[data:*/*;base64,]", "");
        setImagePath(src);
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const submitFun = async (e) => {
    //Send form to API
    e.preventDefault();
    const formData = new FormData();
    const data = e.target;
    formData.append("reimbursement_id", reimbursmentId);
    formData.append("expense_id", data.expenseId.value);
    formData.append("amount", data.amount.value);
    formData.append("vendor", data.vendor.value);
    formData.append("currency", data.currency.value);
    formData.append("description", "");
    formData.append("image", data["invoice-file"].files[0]);
    const resp = await axios.post("/invoices/invoices", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(resp);
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursmentId}`,
      setInvoiceList,
    );
  };

  return (
    <form onSubmit={submitFun} className="invoiceForm">
      <div className="image-upload">
        <img className="invoice-preview" src={imagePath}></img>
        <label htmlFor="invoice-file">
          <p> Upload File</p>
        </label>
        <input
          id="invoice-file"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          required
        />
      </div>
      <p className="invoice-question">
        <label htmlFor="expenseId">Expense</label>
        <select name="expenseId" id="expenseId">
          {expenseList.map((e) => {
            return <option value={e.id}>{e.name}</option>;
          })}
        </select>
      </p>
      <p className="invoice-question">
        <label htmlFor="vendor">Vendor</label>
        <input type="text" id="vendor" name="vendor" required></input>
      </p>
      <p className="invoice-question">
        <label htmlFor="amount">Amount</label>
        <input type="tel" id="amount" name="amount" required></input>
        <select name="currency" id="currency" defaultValue="USD">
          <option value="COP">COP</option>
          <option value="USD">USD</option>
          <option value="ARG">ARG</option>
        </select>
      </p>
      <button className="submit-expense" type="submit">
        Add expense
      </button>
    </form>
  );
};

export default InvoiceForm;
