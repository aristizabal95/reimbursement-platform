import React from "react";
import { Link } from "react-router-dom";

const Reimbursment = ({ info = {} }) => {
  const createDate = new Date(info.created_at);
  return (
    <li className="pb-4 grid grid-cols-3 border-b border-dashed border-dark">
      <Link
        className="capitalize text-blue-700 col-span-2"
        to={`/invoice-detail/${info.reimbursement_id}/${info.event_id}`}
      >
        {info.event}
      </Link>
      <div className="text-center text-pending capitalize border rounded-[20px] bg-[#FDE4E1]">
        {info.status}
      </div>
      <p>{createDate.toLocaleDateString("en-US")}</p>
    </li>
  );
};

export default Reimbursment;
