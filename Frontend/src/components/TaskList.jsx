import React, { useState, useEffect } from "react";
import { fetchData } from "./utils.jsx";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //TODO: changes the status for "pending"
    fetchData(
      "/reimbursements/reimbursements?reimbursement_status=1",
      setTasks,
    );
  }, []);

  return (
    <ul className="m-3 space-y-1 xl:w-[50%]">
      {tasks.map((el) => {
        const createDate = new Date(el.created_at);
        return (
          <li className="pb-4 grid grid-cols-3 border-b border-dashed border-dark">
            <Link
              to={`/task-detail/${el.reimbursement_id}`}
              className="capitalize text-blue-700 col-span-2"
            >
              {el.event}
            </Link>
            <p> {createDate.toLocaleDateString()}</p>
            <p> {el.username}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
