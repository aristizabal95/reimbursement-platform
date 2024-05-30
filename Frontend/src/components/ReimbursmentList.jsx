import React, { useState, useEffect, useContext } from "react";
import Reimbursment from "./Reimbursment";
import { AuthContext, fetchData } from "./utils";
import axios from "../api/axios";

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
    <ul className="m-3">
      {reimbursements.map((el) => {
        return <Reimbursment key={el.event_id} info={el}></Reimbursment>;
      })}
    </ul>
  );
};

export default ReimbursmentList;
