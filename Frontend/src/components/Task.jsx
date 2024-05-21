import React from "react";
import "./Task.css";

const Task = ({ info = {}, setReimbClick, selectedId }) => {
  const createDate = new Date(info.created_at);

  return (
    <section
      className="tasksection"
      onClick={setReimbClick}
      style={{
        display:
          (selectedId == "all") | (selectedId == info.id) ? "flex" : "none",
      }}
    >
      <header className="taskheader">
        <h3>{info.username}</h3>
        <div>{createDate.toLocaleDateString()}</div>
      </header>
      <section className="maininfo">
        <div>{info.event}</div>
        <div>{info.currency}</div>
      </section>
    </section>
  );
};

export default Task;
