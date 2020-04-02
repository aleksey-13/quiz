import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: true,
  error: null,
  activeQuestion: 0,
  answerState: null, // { [id]: 'success' || 'error' }
  isFinished: false,
  results: {}, // { [id]: 'success' || 'error' }
  quiz: null
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, quizes: [], quiz: null, loading: true, error: null };

    case FETCH_QUIZES_SUCCESS:
      return { ...state, quizes: action.payload, loading: false };

    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        quiz: null,
        quizes: [],
        loading: false,
        error: action.payload
      };

    case FETCH_QUIZ_SUCCESS:
      return { ...state, quiz: action.payload, loading: false };

    case QUIZ_SET_STATE:
      return {
        ...state,
        results: action.payload.results,
        answerState: action.payload.answerState
      };

    case FINISH_QUIZ:
      return { ...state, isFinished: true };

    case QUIZ_NEXT_QUESTION:
      return { ...state, activeQuestion: action.payload, answerState: null };

    case QUIZ_RETRY:
      return {
        ...state,
        isFinished: false,
        answerState: null,
        activeQuestion: 0,
        results: {}
      };

    default:
      return state;
  }
}
