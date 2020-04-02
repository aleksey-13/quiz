import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {
  createQuizQuestion,
  finishCreateQuiz
} from "../../store/actions/create";

import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";

import classes from "./QuizCreator.module.css";
import Loader from "../../components/UI/Loader/Loader";

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

class QuizCreator extends Component {
  state = {
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
    const quiz = [...this.props.quiz];
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

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });

    this.props.finishCreateQuiz();
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
    const { rightAnswerId, isFormValid } = this.state;
    const { quiz, loading } = this.props;
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
    const loader = loading ? (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader />
      </div>
    ) : null;

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {loader}
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

function mapStateToProps({ create }) {
  return {
    quiz: create.quiz,
    loading: create.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
