import React, { Component } from "react";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

import classes from "./Quiz.module.css";

export default class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' || 'error' }
    isFinished: false,
    results: {}, // { [id]: 'success' || 'error' }
    quiz: [
      {
        id: 1,
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        answers: [
          { id: 1, text: "Красный" },
          { id: 2, text: "Синего" },
          { id: 3, text: "Зеленый" },
          { id: 4, text: "Оранжевый" }
        ]
      },
      {
        id: 2,
        question: "Сколько глаз у человека?",
        rightAnswerId: 2,
        answers: [
          { id: 1, text: "1" },
          { id: 2, text: "2" },
          { id: 3, text: "Что это?" },
          { id: 4, text: "3" }
        ]
      },
      {
        id: 3,
        question: "Когда началась Вторая Мировая Война?",
        rightAnswerId: 3,
        answers: [
          { id: 1, text: "1941" },
          { id: 2, text: "1919" },
          { id: 3, text: "1939" },
          { id: 4, text: "А она была?" }
        ]
      }
    ]
  };

  componentDidMount() {}

  onAnswerClickHandler = answerId => {
    const { quiz, activeQuestion, answerState, results } = this.state;
    const question = quiz[activeQuestion];
    const newResults = { ...results };

    if (answerState) {
      const key = Object.keys(answerState)[0];

      if (answerState[key] === "success") {
        return;
      }
    }

    if (answerId === question.rightAnswerId) {
      this.setState({
        answerState: { [answerId]: "success" }
      });

      if (!newResults[question.id]) {
        newResults[question.id] = "success";
      }

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 200);
    } else {
      this.setState({
        answerState: { [answerId]: "error" }
      });
      newResults[question.id] = "error";
    }
    this.setState({
      results: newResults
    });
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      isFinished: false,
      answerState: null,
      activeQuestion: 0,
      results: {}
    });
  };

  render() {
    const {
      quiz,
      activeQuestion,
      answerState,
      isFinished,
      results
    } = this.state;

    const content = !isFinished ? (
      <ActiveQuiz
        answers={quiz[activeQuestion].answers}
        question={quiz[activeQuestion].question}
        onAnswerClick={this.onAnswerClickHandler}
        quizLength={quiz.length}
        answerNumber={activeQuestion + 1}
        state={answerState}
      />
    ) : null;

    const finished = isFinished ? (
      <FinishedQuiz results={results} quiz={quiz} onRetry={this.retryHandler} />
    ) : null;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Атветь!</h1>
          {content}
          {finished}
        </div>
      </div>
    );
  }
}
