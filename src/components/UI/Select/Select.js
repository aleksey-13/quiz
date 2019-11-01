import React from 'react';

import classes from './Select.module.css';

const Select = (props) => {
    const {label, value, onChange, options} = props;
    const htmlFor = `${label}-${Math.random}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{label}</label>
            <select id={htmlFor} value={value} onChange={onChange}>
                {options.map(( { value, text }, index ) => {
                    return (
                        <option value={value} key={value + index}>
                            {text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default Select;
