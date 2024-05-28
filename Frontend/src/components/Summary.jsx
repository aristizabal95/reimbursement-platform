import React, { useState } from "react";
import "./Summary.css";

const Summary = ({ detail = [], onSubmit }) => {
  const amountsKeys =
    detail.length != 0
      ? detail.map((el) => [`input${el.invoice_id}`, +el.amount])
      : null;
  const amountsInit = Object.fromEntries(amountsKeys);
  const [amounts, setAmounts] = useState(amountsInit);
  const total = Object.values(amounts).reduce((acc, v) => acc + v, 0);

  const changeInput = (e) => {
    //TODO: sum with a same currency.
    setAmounts({
      ...amounts,
      [e.target.id]: +e.target.value,
    });
  };

  return (
    <form className="summaryform" onSubmit={onSubmit}>
      {detail.length != 0 ? (
        detail.map((el) => {
          return (
            <div className="summaryitem" id={`summary${el.invoice_id}`}>
              <p>{el.vendor}</p>
              <input
                type="tel"
                id={`input${el.invoice_id}`}
                defaultValue={el.amount.toLocaleString()}
                onChange={changeInput}
              ></input>
              <span>{el.currency}</span>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="summarytotal">
        <p>
          {total.toLocaleString()} <span>COP</span>
        </p>
      </div>
      <button className="approve" type="submit">
        Approve
      </button>
    </form>
  );
};

export default Summary;
