import React from "react";

import AnswerItem from "./AnswerItem/AnswerItem";

import classes from "./AnswersList.module.css";

const AnswersList = ({ answers, onAnswerClick, state }) => {
  return (
    <ul className={classes.AnswersList}>
      {answers.map((answer, idx) => (
        <AnswerItem
          key={idx}
          answer={answer}
          onAnswerClick={onAnswerClick}
          state={state ? state[answer.id] : null}
        />
      ))}
    </ul>
  );
};

export default AnswersList;
