import {
  CREATE_QUIZ_QUESTION,
  FINISH_CREATE_QUIZ,
  RESET_QUIZ_CREATION,
  UPLOAD_QUIZ_LOADING_INDICATOR
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    payload: item
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  };
}

export function uploadQuizLoadingIndicator() {
  return {
    type: UPLOAD_QUIZ_LOADING_INDICATOR
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    dispatch(uploadQuizLoadingIndicator());
    await axios.post("quizes.json", getState().create.quiz);
    dispatch(resetQuizCreation());
    return {
      type: FINISH_CREATE_QUIZ
    };
  };
}
