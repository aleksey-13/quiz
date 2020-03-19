import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./Drawer.module.css";

const Drawer = ({ isOpen, onClose }) => {
  const links = [
    { label: "Список", to: "/", exact: true },
    { label: "Авторизация", to: "/auth", exact: false },
    { label: "Создать тест", to: "/quiz-reactor", exact: false }
  ];
  const cls = [classes.Drawer];
  const backdrop = isOpen ? <Backdrop onClose={onClose} /> : null;

  if (!isOpen) {
    cls.push(classes.close);
  }

  const renderLinks = links.map(({ label, exact, to }) => (
    <li key={label}>
      <NavLink
        to={to}
        exact={exact}
        activeClassName={classes.active}
        onClick={onClose}
      >
        {label}
      </NavLink>
    </li>
  ));

  return (
    <Fragment>
      {backdrop}
      <nav className={cls.join(" ")}>
        <ul>{renderLinks}</ul>
      </nav>
    </Fragment>
  );
};

export default Drawer;
