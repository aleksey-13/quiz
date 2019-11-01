import React, {Component} from 'react';
import axios from 'axios';
import {createControl, validate, validateForm} from '../../form/formFramework';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

import classes from './QuizCreator.module.css';

function createOptionCntrol(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        }, 
        { required: true }
    )
}

function createFormControls() {
    
    return {
            question: createControl({
                label: `Введите вопрос`,
                errorMessage: 'Вопрос не может быть пустым',
            }, { required: true }),
            option1: createOptionCntrol(1),
            option2: createOptionCntrol(2),
            option3: createOptionCntrol(3),
            option4: createOptionCntrol(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    submitHandler = (event) => event.preventDefault();

    addQuesionHandler = (event) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const qestionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ] 
        };

        quiz.push(qestionItem);

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    }

    createQuizHanler = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://react-quiz-7759d.firebaseio.com/.json', this.state.quiz);
            
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            })
        } catch(e) {
            console.log(e);
        }
    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...this.state.formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        }) 
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.onChangeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            );
        });
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })

    }
    
    render() {
        const select = <Select 
                            label="Выберите правильный ответ" 
                            value={this.state.rightAnswerId} 
                            onChange={this.selectChangeHandler} 
                            options={[
                                {text: 1, value: 1},
                                {text: 2, value: 2},
                                {text: 3, value: 3},
                                {text: 4, value: 4}
                            ]} />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderControls() }

                        { select }

                        <Button type="primary" onClick={this.addQuesionHandler} disabled={!this.state.isFormValid}>Добавить вопрос</Button>
                        <Button type="seccess" onClick={this.createQuizHanler} disabled={!this.state.quiz.length}>Создать тест</Button>
                    </form>
                </div>
            </div>
        );
    }
}
