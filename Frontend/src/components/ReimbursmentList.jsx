import React, { useState, useEffect, useContext } from "react";
import { AuthContext, fetchData } from "./utils";
import { Link } from "react-router-dom";
import NewReimbursement from "./NewReimbursement";

const ReimbursmentList = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchData(
      `/reimbursements/reimbursements?user_id=${auth.userId}`,
      setReimbursements,
    );
  }, []);

  return (
    <>
      <ul className="m-3 space-y-3">
        {reimbursements.map((info) => {
          const createDate = new Date(info.created_at);
          return (
            <li
              key={info.id}
              className="pb-4 grid grid-cols-3 border-b border-dashed border-dark"
            >
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
        })}
      </ul>
      <NewReimbursement></NewReimbursement>
    </>
  );
};

export default ReimbursmentList;
