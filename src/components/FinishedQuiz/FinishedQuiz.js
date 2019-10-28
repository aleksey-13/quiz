import React from 'react';

import classes from './FinishedQuiz.module.css';

const FinishedQuiz = ({ results, quiz, onRetry }) => {
    const successCounter = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success'){
             total++ 
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { quiz.map((quizItem, index) => {
                     const cls = [
                        'fa',
                        results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[results[quizItem.id]]
                    ];

                    return (
                        <li key={Math.floor(Math.random()*1000)}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    );
                }) }
            </ul>

            <p>Правильно {successCounter} из {quiz.length}</p>

            <div>
                <button onClick={onRetry}>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz;
