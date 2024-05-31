import React from "react";
import { Link } from "react-router-dom";

const InvoiceList = ({ invoice }) => {
  return (
    <tr>
      <td>
        <Link
          to={`/invoice/${invoice.id}`}
          className="text-blue-700 capitalize'"
        >
          {invoice.vendor}
        </Link>
      </td>
      <td>{(+invoice.amount).toLocaleString()}</td>
      <td>{invoice.currency}</td>
    </tr>
  );
};

export default InvoiceList;
