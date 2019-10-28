import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.css';

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' || 'error' }
        quiz: [
            { 
                question: 'What color is the sky?',
                rightAnswer: 1,
                id: 0,
                answers: [
                    { text: 'Black', id: 0},
                    { text: 'Blue', id: 1},
                    { text: 'Red', id: 2},
                    { text: 'Green', id: 3}
                ]
            },
            { 
                question: 'В каком году началась Вторая Мировая Война?',
                rightAnswer: 3,
                id: 1,
                answers: [
                    { text: 1912, id: 0},
                    { text: 1931, id: 1},
                    { text: 1941, id: 2},
                    { text: 1939, id: 3}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerID) => {
        const { quiz, activeQuestion } = this.state;
        const question = quiz[activeQuestion];

        if (answerID === question.rightAnswer) {
            this.setState({
                answerState: {[answerID]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('Finished')
                } else {
                    this.setState({
                        activeQuestion: activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerID]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        const { quiz, activeQuestion, answerState } = this.state;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    <ActiveQuiz 
                        answers={quiz[activeQuestion].answers} 
                        question={quiz[activeQuestion].question} 
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={quiz.length}
                        answerNumber={activeQuestion + 1}
                        state={answerState}/>
                </div>
            </div>
        );
    }
}

export default Quiz;