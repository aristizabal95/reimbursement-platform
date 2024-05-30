//This should be
import React, { useState } from "react";

const EventForm = () => {
  const [availableEvents, setAvailableEvent] = useState([]);

  useEffect(() => {
    fetchData(`/events/events?user_id=${auth.userId}`, setAvailableEvent);
  }, []);

  const reloadAndSubmit = async (e) => {
    e.preventDefault();
    const data = e.target;
    const resp = await axios.post(
      "/reimbursements/reimbursements",
      JSON.stringify({
        event_id: data.event.value,
        user_id: auth.userId,
      }),
    );
    // TODO: deal with error here!
    setEventSubmitted(eventSubmitted + 1);
    setClickNew(!clickNew);
  };

  return (
    <form
      onSubmit={submitFun}
      method="POST"
      className="reimbform"
      style={{ display: display ? "" : "none" }}
    >
      <ul className="select-event">
        {availableEvents.length != 0 ? (
          availableEvents.map((el) => {
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
