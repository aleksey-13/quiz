import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.css';

class Quiz extends Component {
    state = {
        quiz: [
            { 
                question: 'What color is the sky?',
                rightAnswer: 1,
                answers: [
                    { text: 'Black', id: 0},
                    { text: 'Blue', id: 1},
                    { text: 'Red', id: 2},
                    { text: 'Green', id: 3}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerID) => {
        if (answerID === this.state.quiz[0].rightAnswer) {
            console.log('You\'re right')
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    <ActiveQuiz 
                        answers={this.state.quiz[0].answers} 
                        question={this.state.quiz[0].question} 
                        onAnswerClick={this.onAnswerClickHandler}/>
                </div>
            </div>
        );
    }
}

export default Quiz;