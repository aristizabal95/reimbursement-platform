import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext, fetchData } from "./utils.jsx";
import InvoiceList from "./InvoiceList.jsx";
import axios from "../api/axios.js";

const ReimbursementDetail = ({ props }) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const { reimbursementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursementId}`,
      setInvoiceList,
    );
  }, []);

  const submitReimbursement = async (e) => {
    e.preventDefault();
    //axios.patch(`/invoices/invoices?reimbursement_id=${reimbursmentId}&status_id=2`)
    navigate("/", { replace: true });
  };

  return (
    <section className="w-full m-2">
      <ul>
        {invoiceList.length != 0 ? (
          invoiceList.map((el) => <InvoiceList invoice={el}></InvoiceList>)
        ) : (
          <></>
        )}
      </ul>
      <div className="submit-container">
        <button className="add-invoice brown">
          <p>New Invoice</p>
        </button>
        <button onClick={submitReimbursement} className="add-invoice green">
          <p>Send to Dani</p>
        </button>
      </div>
    </section>
  );
};

export default ReimbursementDetail;
