import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.css';

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}

]
export default class Drawer extends Component {

    renderLinks() {
        return links.map((link) => {
            return (
                <li key={Math.floor(Math.random() * 1000)}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active} 
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];
        const { isOpen, onClose } = this.props;

        if (!isOpen) {
            cls.push(classes.close)
        } 

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                { isOpen ? <Backdrop onClick={onClose}/> : null }
            </React.Fragment>
        );
    }
}
