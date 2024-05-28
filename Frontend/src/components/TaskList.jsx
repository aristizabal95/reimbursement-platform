import React, { useState, useEffect } from "react";
import Task from "./Task.jsx";
import { fetchData } from "./utils.jsx";
import TaskCarousel from "./TaskCarousel.jsx";

const TaskList = () => {
  const [info, setInfo] = useState([]);
  const [reimbId, SetReimbId] = useState("all");
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    //TODO: changes the status for "pending"
    fetchData("/reimbursements/reimbursements?reimbursement_status=1", setInfo);
  }, []);

  useEffect(() => {
    try {
      fetchData(`/invoices/invoices?reimbursement_id=${reimbId}`, setDetail);
    } catch (error) {
      console.log(error);
    }
  }, [reimbId]);

  const focusTask = (el) => {
    if (el.reimbursement_id == reimbId) {
      SetReimbId("all");
    } else {
      SetReimbId(el.reimbursement_id);
    }
  };

  const approve = (e) => {
    e.preventDefault();
    SetReimbId("all");
  };

  return (
    <section className="mainpanel">
      <section className="tasklist">
        {info.map((el) => (
          <Task
            key={el.reimbursement_id}
            info={el}
            setReimbClick={() => focusTask(el)}
            selectedId={reimbId}
          ></Task>
        ))}
      </section>
      <TaskCarousel onSubmit={approve} detail={detail}></TaskCarousel>
    </section>
  );
};

export default TaskList;
