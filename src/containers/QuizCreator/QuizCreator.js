import React, { Component } from "react";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";

import classes from "./QuizCreator.module.css";

function createOptionControl(number) {
  return createControl(
    {
      label: `Введите вопрос ${number}`,
      id: number,
      errorMessage: "Вопрос не может быть пустым"
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым"
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  };

  submitHandler(event) {
    event.preventDefault();
  }

  addQuestionHandler = event => {
    event.preventDefault();

    const { formControls, rightAnswerId } = this.state;
    const { question, option1, option2, option3, option4 } = formControls;
    const quiz = [...this.state.quiz];
    const idx = quiz.length + 1;

    const questionItem = {
      question: question.value,
      rightAnswerId,
      id: idx,
      answers: [
        { id: option1.id, text: option1.value },
        { id: option2.id, text: option2.value },
        { id: option3.id, text: option3.value },
        { id: option4.id, text: option4.value }
      ]
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = (event) => {
      event.preventDefault();

      console.log(this.state.quiz)
  };

  changeHandler = (value, controlName) => {
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

  renderControls() {
    const { formControls } = this.state;

    return Object.keys(formControls).map((control, index) => (
      <Auxiliary key={control + index}>
        <Input
          {...formControls[control]}
          shouldValidate={!!formControls[control].validation}
          onChange={event => this.changeHandler(event.target.value, control)}
        />
        {index === 0 ? <hr /> : null}
      </Auxiliary>
    ));
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: Number(event.target.value)
    });
  };

  render() {
    const { rightAnswerId, isFormValid, quiz } = this.state;
    const inputs = this.renderControls();
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
          { text: "4", value: "4" }
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {inputs}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!isFormValid}
            >
              Добаить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
