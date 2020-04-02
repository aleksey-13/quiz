import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  UPLOAD_QUIZ_LOADING_INDICATOR
} from "../actions/actionTypes";

const initialState = {
  quiz: [],
  loading: false
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return { ...state, quiz: [...state.quiz, action.payload] };
    case RESET_QUIZ_CREATION:
      return { ...state, quiz: [], loading: false };
    case UPLOAD_QUIZ_LOADING_INDICATOR:
      return { ...state, loading: true };
    default:
      return state;
  }
}
