//This should be
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, fetchData } from "./utils";
import addIcon from "../assets/add-icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const NewReimbursement = () => {
  const [availableEvents, setAvailableEvent] = useState([]);
  const [click, setClick] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`/events/events?user_id=${auth.userId}`, setAvailableEvent);
  }, []);

  const reloadAndSubmit = async (e) => {
    const resp = await axios.post(
      "/reimbursements/reimbursements",
      JSON.stringify({
        event_id: e.target.id,
        user_id: auth.userId,
      }),
    );
    navigate(`/invoice-detail/${auth.userId}/${resp.data.id}`);
  };

  return (
    <div className="relative inline-block">
      <div>
        <button
          onClick={() => setClick(!click)}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold shadow-sm"
          id="menu-button"
          aria-expanded="true"
        >
          <img src={addIcon}></img>
        </button>
      </div>
      <div
        style={{ display: click ? "" : "none" }}
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {availableEvents.map((el) => {
          return (
            <p
              onClick={reloadAndSubmit}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id={el.id}
            >
              {el.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default NewReimbursement;
