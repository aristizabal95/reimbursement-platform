import React from "react";
import { Link } from "react-router-dom";

const InvoiceList = ({ invoice }) => {
  return (
    <li
      key={invoice.id}
      className="flex justify-between items-center w-full pb-2"
    >
      <p className="capitalize">{invoice.vendor}</p>
      <p>
        {(+invoice.amount).toLocaleString()} <span>{invoice.currency}</span>
      </p>
      <Link to={`/invoice/${invoice.id}`} className="text-blue-700 capitalize'">
        edit
      </Link>
    </li>
  );
};

export default InvoiceList;
