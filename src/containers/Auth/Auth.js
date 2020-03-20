import React, { Component } from "react";
import axios from "axios";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";

import classes from "./Auth.module.css";

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: createControl(
        {
          type: "email",
          label: "Email",
          errorMessage: "Введите корректный email"
        },
        {
          required: true,
          email: true
        }
      ),
      password: createControl(
        {
          type: "password",
          label: "Пароль",
          errorMessage: "Введите корректный пароль"
        },
        {
          required: true,
          minLength: 6
        }
      )
    }
  };

  loginHandler = async () => {
    const {
      formControls: { email, password }
    } = this.state;
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    };

    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfIDJCHN1XSanAy8IpXTn4G2Eh7uZ-EuY",
      authData
    );
    console.log(response);
  };

  registerHandler = async () => {
    const {
      formControls: { email, password }
    } = this.state;
    const authData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    };

    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfIDJCHN1XSanAy8IpXTn4G2Eh7uZ-EuY",
      authData
    );
    console.log(response);
  };

  submitHandler(event) {
    event.preventDefault();
  }

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    let control = { ...formControls[controlName] };

    control = {
      ...control,
      value,
      touched: true,
      valid: validate(control.value, control.validation)
    };

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderInputs() {
    const { formControls } = this.state;
    return Object.keys(formControls).map((controlName, index) => (
      <Input
        {...formControls[controlName]}
        key={controlName + index}
        onChange={event =>
          this.onChangeHandler(event.target.value, controlName)
        }
      />
    ));
  }

  render() {
    const { isFormValid } = this.state;
    const inputs = this.renderInputs();

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {inputs}
            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
