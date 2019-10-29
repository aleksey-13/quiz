import React from 'react'

import classes from './Backdrop.module.css';

const Backdrop = ({onClick}) => <div className={classes.Backdrop} onClick={onClick}></div>

export default Backdrop;
