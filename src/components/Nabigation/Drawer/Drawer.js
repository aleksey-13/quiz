import React, {Component} from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.css';
import { is } from '@babel/types';

const liks = [1, 2, 3]
export default class Drawer extends Component {

    renderLinks() {
        return liks.map((el) => <li><a>Link {el}</a></li>)
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
