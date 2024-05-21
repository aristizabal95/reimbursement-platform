import React from "react";
import "./Reimbursment.css";
import { Link } from "react-router-dom";

const Reimbursment = ({ info = {}, setReimbClick }) => {
  const createDate = new Date(info.created_at);

  return (
    <Link
      className="linkstyle"
      to={`/invoice-detail/${info.reimbursement_id}/${info.event_id}`}
    >
      <section className="reimbsection" onClick={setReimbClick}>
        <header className="reimbheader">
          <h3>{info.event}</h3>
          <div>{createDate.toLocaleDateString()}</div>
        </header>
        <section className="maininfo">
          <div>{info.status}</div>
          <div>
            <span>{`${info.currency}`}</span>
          </div>
        </section>
      </section>
    </Link>
  );
};

export default Reimbursment;
