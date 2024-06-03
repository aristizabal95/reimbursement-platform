import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./utils.jsx";
import cameraIcon from "../assets/camera-icon.svg";
import SuccessButton from "./SuccessButton.jsx";
import CurrencySelector from "./CurrencySelector.jsx";
import axios from "../api/axios.js";
import Spinner from "./Spinner.jsx";

const InvoiceForm = () => {
  const { reimbursementId, eventId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    fetchData(`/expenses/expenses?event_id=${eventId}`, setExpenseList);
  }, []);

  const handleFileSelect = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      async () => {
        const src = reader.result.replace("[data:*/*;base64,]", "");
        setImagePath(src);
        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        const resp = await axios.post("/invoices/invoices/parser", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPlaceHolder(resp.data);
        setLoading(false);
      },
      false,
    );
    reader.readAsDataURL(file);
  };

  const submitFun = async (e) => {
    //Send form to API
    e.preventDefault();
    const formData = new FormData();
    const data = e.target;
    formData.append("reimbursement_id", reimbursmentId);
    formData.append("expense_id", data.expenseId.value);
    formData.append("amount", data.amount.value);
    formData.append("vendor", data.vendor.value);
    formData.append("currency", data.currency.value);
    formData.append("dte", data.dte.value);
    formData.append("description", "");
    formData.append("image", data["invoice-file"].files[0]);
    const resp = await axios.post("/invoices/invoices", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(resp);
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursmentId}`,
      setInvoiceList,
    );
  };

  return (
    <form
      onSubmit={submitFun}
      className="flex flex-col w-full space-y-3 m-4 xl:m-10"
    >
      <div className="bg-[#EAEAF1]">
        <label className="flex flex-col items-center" htmlFor="invoice-file">
          <div className="flex flex-col m-10 items-center xl:w-[30%] sm:w-[200px]">
            <img
              className="object-cover"
              src={imagePath}
              style={{ display: imagePath == "" ? "none" : "" }}
            ></img>
            <img
              className="w-[24px] h-[24px]"
              src={cameraIcon}
              style={{ display: imagePath != "" ? "none" : "" }}
            ></img>
            <p
              style={{ display: imagePath != "" ? "none" : "" }}
              className="text-sm text-lightWithe"
            >
              Take screenshot or browse device
            </p>
          </div>
          <input
            id="invoice-file"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            required
          />
        </label>
      </div>
      <div
        className="flex felx-row justify-center"
        style={{ display: isLoading ? "" : "none" }}
      >
        <Spinner></Spinner>
      </div>
      <div
        style={{
          display:
            isLoading | (Object.keys(placeholder).length == 0) ? "none" : "",
        }}
      >
        <p className="flex flex-col justify-start">
          <label htmlFor="expenseId" className="text-darkBlack700">
            Expense
          </label>
          <select
            name="expenseId"
            id="expenseId"
            className="m-1 pt-1 border rounded-[20px] bg-white pl-1.5"
          >
            {expenseList.map((e) => {
              return <option value={e.id}>{e.name}</option>;
            })}
          </select>
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="dte" className="text-darkBlack700">
            Date
          </label>
          <input
            className="bg-white border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
            type="date"
            id="dte"
            name="dte"
            value={placeholder.date}
            required
          ></input>
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="vendor" className="text-darkBlack700">
            Vendor
          </label>
          <input
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
            type="text"
            id="vendor"
            name="vendor"
            value={placeholder.vendor}
            required
          ></input>
        </p>
        <p className="flex flex-col justify-start">
          <label htmlFor="amount" className="text-darkBlack700">
            Amount
          </label>
          <input
            className="border rounded-[20px] m-1 pt-1 pl-1.5 bg-white"
            type="tel"
            id="amount"
            name="amount"
            value={placeholder.total_amount}
            required
          ></input>
        </p>
        <p className="flex flex-col justify-start">
          <lable htmlFor="currency" className="text-darkBlack700">
            Currency
          </lable>
          <CurrencySelector
            name="currency"
            className="m-1 pt-1 border rounded-[20px] bg-white pl-1.5"
          />
        </p>
        <SuccessButton text="Add Invoice" className="p-2"></SuccessButton>
      </div>
    </form>
  );
};

/* field */

export default InvoiceForm;
