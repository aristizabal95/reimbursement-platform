import { useContext, useEffect, useState } from "react";
import { AuthContext, fetchData } from "./utils";
import axios from "../api/axios";
import CurrencySelector from "./CurrencySelector";

const NewEventForm = () => {
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
  }, []);

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
      <form className="m-3" onSubmit={createEvent}>
        <p className="flex flex-col justify-start">
          <label htmlFor="title" className="text-darkBlack700">
            Name
          </label>
          <input
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
            type="text"
            id="title"
            name="title"
            required
          ></input>
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="center_of_costs" className="text-darkBlack700">
            Cost Center
          </label>
          <input
            type="text"
            id="center_of_costs"
            name="center_of_costs"
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
          />
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="budget">Budget by person</label>
          <input
            type="tel"
            id="budget"
            name="budget"
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
          />
        </p>
        <p className="flex flex-col justify-start">
          <lable htmlFor="currency" className="text-darkBlack700">
            Currency
          </lable>
          <CurrencySelector className="m-1 pt-1 border rounded-[20px] bg-white pl-1.5"></CurrencySelector>
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="ends_at" className="text-darkBlack700">
            End date
          </label>
          <input
            type="date"
            id="ends_at"
            name="ends_at"
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
          />
        </p>
        <form
          id="new-expense-form"
          className="flex flex-col justify-center border-t-2 border-dashed"
        >
          <div className="flex flex-row justify-start space-x-2">
            {expenseList != 0 ? (
              expenseList.map((el) => {
                return (
                  <div className="flex flex-col bg-green-500 text-lightWhite200 border-2 border-black">
                    <p>{el.name}</p>
                    <p>{el.budget}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <fieldset className="m-4 flex flex-col border-2 justify-center">
            <p className="form-item">
              <label htmlFor="expense-name">Name</label>
              <input
                type="text"
                id="expense-name"
                name="expense-name"
                className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
              />
            </p>
            <p className="form-item">
              <label htmlFor="budget-exp">Budget</label>
              <input
                type="text"
                id="budget-exp"
                name="budget-exp"
                className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
              />
            </p>
            <p className="form-item">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                name="desc"
                className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
              />
            </p>
            <button form="new-expense-form" type="button" onClick={addExpense}>
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
