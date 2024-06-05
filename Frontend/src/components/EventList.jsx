import React, { useContext, useEffect, useState } from "react";
import { AuthContext, fetchData } from "./utils";
import { Link } from "react-router-dom";
import addIcon from "../assets/add-icon.svg";

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchData("/events/events", setEventList);
  }, []);

  return (
    <div>
      <ul className="m-3 space-y-3">
        {eventList.map((el) => {
          return (
            <li
              key={el.id}
              className="pb-4 grid grid-cols-3 border-b border-dashed border-dark"
            >
              <Link
                to={`/event-detail/${el.id}`}
                className="capitalize text-blue-700 col-span-2"
              >
                {el.title}
              </Link>
              <p>
                {el.budget} <span>{el.currency}</span>
              </p>
            </li>
          );
        })}
      </ul>
      <Link to="/add-event" className="inline-flex w-full justify-center mt-4">
        <img src={addIcon}></img>
      </Link>
    </div>
  );
};

export default EventList;
