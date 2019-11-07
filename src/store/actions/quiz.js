import axios from '../../axios/axios-quiz';
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE, 
    FINISH_QUIZ, 
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const quizes = [];

            await axios.get('/.json')
                .then((response) => {
                    Object.keys(response.data).forEach((key, index) => {
                        quizes.push({
                            id: key,
                            name: `Test #${index + 1}`
                        });
                    });
                });

            dispatch(fetchQuizesSuccess(quizes));
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizID) {
    return async dispatch => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axios.get(`${quizID}.json`);
            const quiz = response.data;
            
            dispatch(fetchQuizSuccess(quiz));
        } catch(e) {
            dispatch(fetchQuizesError(e));
        }

    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function funishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerID) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        const { quiz, activeQuestion, answerState, results } = state;
        const question = quiz[activeQuestion];

        if (answerState) {
            const key = Object.keys(answerState)[0];
            if (answerState[key] === 'success') return;
        }
    
        if (answerID === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState({[answerID]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(funishQuiz())
                } else {
                    dispatch(quizNextQuestion(activeQuestion + 1))
                }
                window.clearTimeout(timeout);
            }, 100)
        } else {
            results[question.id] = 'error';

            dispatch(quizSetState({[answerID]: 'error'}, results));
        }
    };
}


function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}