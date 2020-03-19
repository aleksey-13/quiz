import React from "react";

import classes from "./Input.module.css";

const isInvalid = (valid, touched, shouldValidate) =>
  !valid && shouldValidate && touched;

const Input = props => {
  const {
    type = "text",
    placeholder,
    label,
    value,
    onChange,
    errorMessage = "Введите верное значение",
    valid,
    touched,
    shouldValidate = true
  } = props;
  const cls = [classes.Input];
  const htmlFor = `${type}-${Math.random()}`;
  const errorMsg = isInvalid(valid, touched, shouldValidate) ? (
    <span>{errorMessage}</span>
  ) : null;

  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      {errorMsg}
    </div>
  );
};

export default Input;
