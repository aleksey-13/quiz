import React from 'react';

import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const { type = "text", 
            label, value, onChange, 
            errorMessage = "Введите верное значение!" } = props;
    const cls = [classes.Input];
    const htmlFor = `${type}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input 
                type={type}
                id={htmlFor}
                value={value}
                onChange={onChange} />

            { isInvalid(props) ? <span>{errorMessage}</span> : null }          
        </div>
    );
}

export default Input;
