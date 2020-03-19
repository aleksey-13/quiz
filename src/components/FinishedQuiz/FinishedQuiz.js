import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Button from "../UI/Button/Button";

import classes from "./FinishedQuiz.module.css";

const FinishedQuizItem = ({ id, question, icon }) => (
  <li>
    <strong>{id}.</strong>&nbsp; {question}
    <FontAwesomeIcon icon={icon.name} className={icon.cls} />
  </li>
);

const FinishedQuiz = props => {
  const { results, quiz, onRetry } = props;
  const listContent = quiz.map(({ question, id }) => {
    const icon = {
      name: faCheck,
      cls: classes.success
    };

    if (results[id] === "error") {
      icon.name = faTimes;
      icon.cls = classes.error;
    }

    return (
      <FinishedQuizItem key={id} index={id} question={question} icon={icon} />
    );
  });
  const rightAnswers = Object.keys(results).filter(
    answer => results[answer] === "success"
  );

  return (
    <div className={classes.FinishedQuiz}>
      <ul>{listContent}</ul>

      <p>
        Правильно {rightAnswers.length} из {quiz.length}
      </p>

      <div>
        <Button onClick={onRetry} type="primary">
          Повторить
        </Button>
        <Link to={"/"}>
          <Button onClick={() => {}} type="success">
            Перейти в список тестов
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
