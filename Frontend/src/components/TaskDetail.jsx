import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ImageMagnifier from "./ImageMagnifier";
import { fetchData } from "./utils";

const TaskDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState([]);
  const { reimbursementId } = useParams();

  useEffect(() => {
    fetchData(
      `/invoices/invoices?reimbursement_id=${reimbursementId}`,
      setDetail,
    );
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === detail.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? detail.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-4">
      <ul className="m-3 space-y-2">
        {detail.map((el, i) => {
          const createDate = new Date(el.created_at);
          const divStyle = i == activeIndex ? { backgroundColor: "coral" } : {};
          return (
            <li
              className="grid grid-cols-4 border-b border-dashed border-dark"
              style={divStyle}
            >
              <p>{el.vendor}</p>
              <p>{el.expense}</p>
              <p>
                $ {el.amount.toLocaleString()}{" "}
                <span className="text-green-700">{el.currency}</span>
              </p>
              <button></button>
              <p className="text-red-700">{createDate.toLocaleDateString()}</p>
            </li>
          );
        })}
      </ul>
      <section className="xl:col-span-3 relative overflow-hidden block">
        <button
          type="button"
          class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black group-hover:bg-black/50">
            <svg
              class="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <div className="w-[450px] h-auto">
          <ImageMagnifier
            detail={detail.length > 0 ? detail[activeIndex] : { url: "" }}
          ></ImageMagnifier>
        </div>
        <button
          type="button"
          class="absolute top-0 start-[450px] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black group-hover:bg-black/50">
            <svg
              class="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </section>
    </section>
  );
};

export default TaskDetail;
