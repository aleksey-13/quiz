import React from 'react';

import classes from './MenuToggle.module.css';

const MenuToggle = ({ onToggle, isOpen }) => {
    const cls = [
        classes.MenuToggle,
        'fa'
    ];

    if (isOpen) {
        cls.push('fa-times', classes.open);
    } else {
        cls.push('fa-bars');
    }

    return (
        <i 
            className={cls.join(' ')}
            onClick={onToggle}
        />
    );
};

export default MenuToggle; 