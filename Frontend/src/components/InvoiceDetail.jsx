import React, { useContext, useEffect, useState } from "react";
import InvoiceForm from "./InvoiceForm.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext, fetchData } from "./utils.jsx";
import ExpenseLi from "./ExpenseLi.jsx";
import axios from "../api/axios.js";

const InvoiceDetail = ({ props }) => {
  const [click, setClick] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const { reimbursmentId, eventId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursmentId}`,
      setInvoiceList,
    );
    fetchData(`/expenses/expenses?event_id=${eventId}`, setExpenseList);
  }, []);

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
    setClick(!click);
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursmentId}`,
      setInvoiceList,
    );
  };

  const submitReimbursement = async (e) => {
    e.preventDefault();
    //axios.patch(`/invoices/invoices?reimbursement_id=${reimbursmentId}&status_id=2`)
    navigate("/", { replace: true });
  };

  return (
    <section className="invoice">
      <ul>
        {invoiceList.length != 0 ? (
          invoiceList.map((el) => (
            <ExpenseLi expense={el} click={click}></ExpenseLi>
          ))
        ) : (
          <></>
        )}
      </ul>
      <div className="submit-container">
        <button onClick={() => setClick(!click)} className="add-invoice brown">
          <p>{!click ? "New invoice" : "Back"}</p>
        </button>
        <button
          onClick={submitReimbursement}
          className="add-invoice green"
          style={{ display: click ? "none" : "flex" }}
        >
          <p>Send to Dani</p>
        </button>
      </div>
      <InvoiceForm
        submitFun={submitFun}
        click={click}
        expenseList={expenseList}
      ></InvoiceForm>
    </section>
  );
};

export default InvoiceDetail;
