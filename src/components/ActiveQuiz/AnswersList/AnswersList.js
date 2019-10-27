import React from 'react';

import AnswerItem from './AnswerItem/AnswerItem';

import classes from './AnswersList.module.css';

const AnswersList = (props) => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer) => {
            return (
                <AnswerItem 
                    key={Math.floor(Math.random() * 10000)}
                    answer={answer} 
                    onAnswerClick={props.onAnswerClick}/>
            );
        }) }
    </ul>
);

export default AnswersList;