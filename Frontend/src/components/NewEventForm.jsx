import { useContext, useEffect, useState } from "react";
import { AuthContext, fetchData } from "./utils";
import axios from "../api/axios";
import CurrencySelector from "./CurrencySelector";
import SuccessButton from "./SuccessButton";
import { useNavigate } from "react-router-dom";

const NewEventForm = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);
  const { auth } = useContext(AuthContext);

  const createEvent = async (e) => {
    e.preventDefault();
    const data = e.target;
    const event = await axios.post(
      "/events/events",
      JSON.stringify({
        title: data.title.value,
        center_of_costs: data.center_of_costs.value,
        is_active: true,
        budget: data.budget.value,
        currency: data.currency.value,
        ends_at: data.ends_at.value,
      }),
    );
    const ee = expenseList.map((el) => {
      return { event_id: event.data.id, ...el };
    });
    const expense = await axios.post(
      "/expenses/expenses",
      JSON.stringify({ expenses: ee }),
    );
    setExpenseList([]);
    navigate("/event-list");
  };

  const addExpense = (e) => {
    e.preventDefault();
    console.log(e.target.form);
    const newExpense = {
      budget: e.target.form["budget-exp"].value,
      name: e.target.form["expense-name"].value,
      description: e.target.form.description.value,
    };
    setExpenseList([...expenseList, newExpense]);
  };

  return (
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
        <CurrencySelector
          name="currency"
          className="m-1 pt-1 border rounded-[20px] bg-white pl-1.5"
        ></CurrencySelector>
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
                <div className="flex flex-col text-white rounded-[20px] mt-2 m-1 bg-emerald-500 text-xs p-1 xl:text-base">
                  <p>{(el.budget + 0).toLocaleString()}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <fieldset className="m-4 flex flex-col space-y-2">
          <p className="flex flex-row justify-evenly items-center">
            <label htmlFor="expense-name">Name</label>
            <input
              type="text"
              id="expense-name"
              name="expense-name"
              className="border rounded-[20px] bg-white"
            />
          </p>
          <p className="flex flex-row justify-evenly items-center">
            <label htmlFor="budget-exp">Budget</label>
            <input
              type="number"
              id="budget-exp"
              name="budget-exp"
              className="border rounded-[20px] bg-white"
            />
          </p>
          <p className="flex flex-row justify-evenly items-center">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="border rounded-[20px] bg-white"
            />
          </p>
          <button
            className="bg-primaryBlue rounded-[20px] w-[96px] h-[30px] text-white"
            form="new-expense-form"
            type="button"
            onClick={addExpense}
          >
            Add expense
          </button>
        </fieldset>
      </form>
      <div className="flex justify-center mt-4 font-medium">
        <SuccessButton
          type="submit"
          text="Create Event"
          className="p-2 font-medium"
        ></SuccessButton>
      </div>
    </form>
  );
};

export default NewEventForm;
