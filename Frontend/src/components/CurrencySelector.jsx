import React from "react";

const CurrencySelector = ({ className, name }) => {
  return (
    <select name={name} id={name} defaultValue="USD" className={className}>
      <option value="COP">COP</option>
      <option value="USD">USD</option>
      <option value="ARG">ARG</option>
    </select>
  );
};

export default CurrencySelector;
