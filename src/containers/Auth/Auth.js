import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input'

import classes from './Auth.module.css';

export default class Auth extends Component {

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = (event) => event.preventDefault();
    
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        <Input type="text" label="Email" />
                        <Input type="text" label="Пароль" errorMessage={'Тest'} />

                        <Button type="success" onClick={this.loginHandler}>Войти</Button>
                        <Button type="primary" onClick={this.registerHandler}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}
