import React from "react";

import classes from "./Select.module.css";

const Select = props => {
  const { label, value, onChange, options } = props;
  const htmlFor = `${label}-${Math.random()}`;

  const renderOptions = options.map((option, idx) => (
    <option key={option.value + idx} value={option.value}>
      {option.text}
    </option>
  ));

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor} value={value} onChange={onChange}>
        {renderOptions}
      </select>
    </div>
  );
};

export default Select;
