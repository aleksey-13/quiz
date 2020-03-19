import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./MenuToggle.module.css";

const MenuToggle = ({ onToggle, isOpen }) => {
  const icon = {
    name: faBars,
    cls: [classes.MenuToggle]
  };

  if (isOpen) {
    icon.name = faTimes;
    icon.cls.push(classes.open);
  }

  return (
    <FontAwesomeIcon
      className={icon.cls.join(" ")}
      onClick={onToggle}
      icon={icon.name}
    />
  );
};

export default MenuToggle;
