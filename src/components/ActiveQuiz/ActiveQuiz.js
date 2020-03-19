import React from "react";

import AnswersList from "./AnswersList/AnswersList";

import classes from "./ActiveQuiz.module.css";

const ActiveQuiz = props => {
  const {
    answers,
    question,
    onAnswerClick,
    quizLength,
    answerNumber,
    state
  } = props;
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp; {question}
        </span>

        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>

      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
      />
    </div>
  );
};

export default ActiveQuiz;
