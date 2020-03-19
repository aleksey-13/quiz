import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = ({ onClose }) => (
  <div className={classes.Backdrop} onClick={onClose} />
);

export default Backdrop;
