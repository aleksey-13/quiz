import React, { Component } from "react";
import { connect } from "react-redux";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Quiz.module.css";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz
} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    const {
      quiz,
      activeQuestion,
      answerState,
      isFinished,
      results,
      loading,
      quizAnswerClick,
      retryQuiz
    } = this.props;

    const loader = loading ? <Loader /> : null;

    const content =
      !isFinished && !loading && quiz ? (
        <ActiveQuiz
          answers={quiz[activeQuestion].answers}
          question={quiz[activeQuestion].question}
          onAnswerClick={quizAnswerClick}
          quizLength={quiz.length}
          answerNumber={activeQuestion + 1}
          state={answerState}
        />
      ) : null;

    const finished = isFinished ? (
      <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
    ) : null;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Атветь!</h1>
          {loader}
          {content}
          {finished}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ quizData }) {
  const {
    activeQuestion,
    answerState,
    isFinished,
    results,
    quiz,
    loading
  } = quizData;

  return {
    activeQuestion,
    answerState,
    isFinished,
    results,
    quiz,
    loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
