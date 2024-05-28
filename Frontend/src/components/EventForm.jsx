//This should be
import React from "react";

const EventForm = ({ display = true, eventList = [{}], submitFun }) => {
  return (
    <form
      onSubmit={submitFun}
      method="POST"
      className="reimbform"
      style={{ display: display ? "" : "none" }}
    >
      <ul className="select-event">
        {eventList.length != 0 ? (
          eventList.map((el) => {
            return (
              <li key={el.id}>
                <input
                  className="event-radio"
                  id={el.id}
                  type="radio"
                  name="event"
                  value={el.id}
                />
                <label htmlFor={el.id}>{el.title}</label>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
      <button className="submit-event" type="submit">
        New Reimbursment
      </button>
    </form>
  );
};

export default EventForm;
