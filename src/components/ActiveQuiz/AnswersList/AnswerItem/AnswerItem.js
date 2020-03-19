import React from "react";

import classes from "./AnswerItem.module.css";

const AnswerItem = ({ answer, onAnswerClick, state }) => {
  const { text } = answer;
  const cls = [classes.AnswerItem];

  if (state) {
    cls.push(classes[state]);
  }

  return (
    <li className={cls.join(" ")} onClick={() => onAnswerClick(answer.id)}>
      {text}
    </li>
  );
};

export default AnswerItem;
