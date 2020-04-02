import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizes } from "../../store/actions/quiz";

import classes from "./QuizList.module.css";

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map(({ id, name }) => (
      <li key={id}>
        <NavLink to={"/quiz/" + id}>{name}</NavLink>
      </li>
    ));
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    const { loading } = this.props;
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

function mapStateToProps({ quizData }) {
  const { quizes, loading } = quizData;
  return {
    quizes,
    loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
