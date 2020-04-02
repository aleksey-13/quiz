import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_SET_STATE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const { data } = await axios.get("quizes.json");

      const quizes = [];

      Object.keys(data).forEach((key, idx) =>
        quizes.push({ id: key, name: `Тест №${idx + 1}` })
      );

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const { data } = await axios.get(`quizes/${quizId}.json`);

      dispatch(fetchQuizeSuccess(data));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes
  };
}

export function fetchQuizeSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: e
  };
}

export function quizSetState(results, answerState) {
  return {
    type: QUIZ_SET_STATE,
    payload: { answerState, results }
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  };
}

export function quizNextQuiestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: number
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const { quiz, activeQuestion, answerState, results } = getState().quizData;
    const question = quiz[activeQuestion];
    const newResults = { ...results };
    let answer = null;

    if (answerState) {
      const key = Object.keys(answerState)[0];

      if (answerState[key] === "success") {
        return;
      }
    }

    if (answerId === question.rightAnswerId) {
      answer = { [answerId]: "success" };

      if (!newResults[question.id]) {
        newResults[question.id] = "success";
      }

      const timeout = window.setTimeout(() => {
        if (activeQuestion + 1 === quiz.length) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuiestion(activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 200);
    } else {
      answer = { [answerId]: "error" };
      newResults[question.id] = "error";
    }
    dispatch(quizSetState(newResults, answer));
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  };
}
