import { combineReducers } from "redux";

import quizReducer from "./quiz";
import createReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
  quizData: quizReducer,
  create: createReducer,
  auth: authReducer
});
