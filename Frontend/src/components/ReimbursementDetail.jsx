import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchData } from "./utils.jsx";
import InvoiceList from "./InvoiceList.jsx";
import axios from "../api/axios.js";

import addIcon from "../assets/add-icon.svg";
import SuccessButton from "./SuccessButton.jsx";

const ReimbursementDetail = ({ props }) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const { reimbursementId, eventId } = useParams();
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
    <section className="w-full m-2 flex flex-col">
      <table className="w-full">
        {invoiceList.length != 0 ? (
          invoiceList.map((el) => <InvoiceList invoice={el}></InvoiceList>)
        ) : (
          <></>
        )}
      </table>
      <Link
        className="mt-3 flex flex-row justify-center"
        to={`/new-invoice/${reimbursementId}/${eventId}`}
      >
        <img src={addIcon}></img>
      </Link>
      <SuccessButton
        onClick={submitReimbursement}
        text="Send"
        className="m-10"
      ></SuccessButton>
    </section>
  );
};

export default ReimbursementDetail;
