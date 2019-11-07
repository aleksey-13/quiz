import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.css';

class Quiz extends Component {

    componentDidMount() {
       this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        const { quiz, activeQuestion, answerState, isFinished, results } = this.props;

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader /> 
                        : isFinished 
                            ? <FinishedQuiz 
                                results={results} 
                                quiz={quiz}
                                onRetry={this.props.retryQuiz} /> 
                            : <ActiveQuiz 
                                answers={quiz[activeQuestion].answers} 
                                question={quiz[activeQuestion].question} 
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                state={answerState} /> 
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { results, isFinished, activeQuestion, answerState, quiz, loading } = state.quiz;
    return {
        results,
        isFinished,
        activeQuestion,
        answerState,
        quiz,
        loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerID => dispatch(quizAnswerClick(answerID)),
        retryQuiz: () => dispatch(retryQuiz())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
