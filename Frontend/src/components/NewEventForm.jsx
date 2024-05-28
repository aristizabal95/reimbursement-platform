import { useContext, useEffect, useState } from "react";
import { AuthContext, fetchData } from "./utils";
import "./NewEventForm.css";
import axios from "../api/axios";

const NewEventForm = () => {
  const [click, setClick] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const { auth } = useContext(AuthContext);

  const createEvent = async (e) => {
    e.preventDefault();
    const data = e.target;
    const event = await axios.post(
      "/events",
      JSON.stringify({
        title: data.title.value,
        center_of_costs: data.center_of_costs.value,
        budget: data.budget.value,
        currency: data.currency.value,
        ends_at: data.ends_at.value,
      }),
    );
    const ee = expenseList.map((el) => {
      return { event_id: event.data.id, ...el };
    });
    const expense = await axios.post("/expenses", JSON.stringify(ee));
    setClick(!click);
    setExpenseList([]);
  };

  const addExpense = (e) => {
    e.preventDefault();
    console.log(e.target.form);
    const newExpense = {
      budget: e.target.form["budget-exp"].value,
      name: e.target.form["expense-name"].value,
      desc: e.target.form.desc.value,
    };
    setExpenseList([...expenseList, newExpense]);
  };

  useEffect(() => {
    fetchData("/events/1", setEventList);
  }, [click]);

  return (
    <section className="new-event-page">
      {eventList.length != 0 ? (
        eventList.map((el) => {
          return (
            <div className="event-header">
              <h3>{el.title}</h3>
              <p>
                {el.budget} <span>{el.currency}</span>
              </p>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <button onClick={() => setClick(!click)} className="add-event brown">
        <p>{!click ? "New event" : "Back"}</p>
      </button>
      <form
        className="new-event-form"
        onSubmit={createEvent}
        style={{ display: click ? "" : "none" }}
      >
        <p className="form-item">
          <label htmlFor="title">Name</label>
          <input type="text" id="title" name="title" className="form-input" />
        </p>
        <p className="form-item">
          <label htmlFor="center_of_costs">Cost Center</label>
          <input
            type="text"
            id="center_of_costs"
            name="center_of_costs"
            className="form-input"
          />
        </p>
        <p className="form-item">
          <label htmlFor="budget">Budget by person</label>
          <input type="tel" id="budget" name="budget" className="form-input" />
        </p>
        <p className="form-item">
          <label htmlFor="currency">Currency</label>
          <select
            name="currency"
            id="currency"
            defaultValue="USD"
            className="form-input"
          >
            <option value="COP">COP</option>
            <option value="USD">USD</option>
            <option value="ARG">ARG</option>
          </select>
        </p>
        <p className="form-item">
          <label htmlFor="ends_at">End date</label>
          <input
            type="date"
            id="ends_at"
            name="ends_at"
            className="form-input"
          />
        </p>
        <form id="new-expense-form" className="expense-form">
          {expenseList != 0 ? (
            expenseList.map((el) => {
              return (
                <p>
                  {el.name}, {el.budget} {el.desc}
                </p>
              );
            })
          ) : (
            <></>
          )}
          <fieldset>
            <p className="form-item">
              <label htmlFor="expense-name">Name</label>
              <input
                type="text"
                id="expense-name"
                name="expense-name"
                className="form-input"
              />
            </p>
            <p className="form-item">
              <label htmlFor="budget-exp">Budget</label>
              <input
                type="text"
                id="budget-exp"
                name="budget-exp"
                className="form-input"
              />
            </p>
            <p className="form-item">
              <label htmlFor="desc">Description</label>
              <input type="text" id="desc" name="desc" className="form-input" />
            </p>
            <button
              form="add-expense"
              type="button"
              onClick={addExpense}
              className="add-event blue"
            >
              Add expense
            </button>
          </fieldset>
        </form>
        <button type="submit" className="add-event green">
          Create
        </button>
      </form>
    </section>
  );
};

export default NewEventForm;
