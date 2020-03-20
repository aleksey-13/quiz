import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from '../../axios/axios-quiz'

import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.css";

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };

  renderQuizes() {
    return this.state.quizes.map(({ id, name }) => (
      <li key={id}>
        <NavLink to={"/quiz/" + id}>{name}</NavLink>
      </li>
    ));
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        "quizes.json"
      );

      const quizes = [];

      Object.keys(data).forEach((key, idx) =>
        quizes.push({ id: key, name: `Тест №${idx + 1}` })
      );

      this.setState({ quizes, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { loading } = this.state;
    const loader = loading ? <Loader /> : null;
    const quizList = !loading ? <ul>{this.renderQuizes()}</ul> : null;

    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {loader}
          {quizList}
        </div>
      </div>
    );
  }
}
