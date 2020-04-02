import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";

import classes from "./Auth.module.css";

class Auth extends Component {
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

  loginHandler = () => {
    const {
      formControls: { email, password }
    } = this.state;

    this.props.auth(email.value, password.value, true);
  };

  registerHandler = () => {
    const {
      formControls: { email, password }
    } = this.state;

    this.props.auth(email.value, password.value, false);
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

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
}

export default connect(null, mapDispatchToProps)(Auth);
