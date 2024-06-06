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
      <section className="xl:col-span-3">
        <button onClick={prevSlide} className="absolute left-0">
          &lt;
        </button>
        <div className="w-[450px] h-auto">
          <ImageMagnifier
            detail={detail.length > 0 ? detail[activeIndex] : { url: "" }}
          ></ImageMagnifier>
        </div>
        <button onClick={nextSlide} className="text-5xl">
          &gt;
        </button>
      </section>
    </section>
  );
};

export default TaskDetail;
