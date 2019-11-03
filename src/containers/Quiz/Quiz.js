import React, { Component } from 'react';

import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.css';

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success || error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' || 'error' }
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerID) => {
        const { quiz, activeQuestion, answerState, results } = this.state;
        const question = quiz[activeQuestion];

        if (answerState) {
            const key = Object.keys(answerState)[0];
            if (answerState[key] === 'success') return;
        }
    
        if (answerID === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerID]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 100)
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerID]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    onRetryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${this.props.match.params.id}.json`);
            const quiz = response.data;
            console.log(quiz)
            this.setState({
                quiz,
                loading: false
            })
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { quiz, activeQuestion, answerState, isFinished, results } = this.state;

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {
                        this.state.loading 
                        ? <Loader /> 
                        : isFinished 
                            ? <FinishedQuiz 
                                results={results} 
                                quiz={quiz}
                                onRetry={this.onRetryHandler} /> 
                            : <ActiveQuiz 
                                answers={quiz[activeQuestion].answers} 
                                question={quiz[activeQuestion].question} 
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState} /> 
                    }

                    

                </div>
            </div>
        );
    }
}

export default Quiz;
