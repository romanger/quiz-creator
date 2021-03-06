import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formFramework';
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createOptionControl(number, id) {
    return createControl({
        label: `Enter ${number} answer variant`,
        errorMessage: 'this field cant be empty',
        id: id,
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter the question',
            errorMessage: 'this field cant be empty',
        }, {required: true}),
        option1: createOptionControl('first', 1),
        option2: createOptionControl('second', 2),
        option3: createOptionControl('third', 3),
        option4: createOptionControl('fourth', 4),
    }
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    submitHandler = (evt) => {
        evt.preventDefault();
    };

    addQuestionHandler = (evt) => {
        evt.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id
                },
                {
                    text: option2.value,
                    id: option2.id
                },
                {
                    text: option3.value,
                    id: option3.id
                },
                {
                    text: option4.value,
                    id: option4.id
                },
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
    };

    createQuizHandler = (evt) => {
        evt.preventDefault();



        this.setState({
            quiz: [],
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
        this.props.finishCreateQuiz();
    };

    changeHandler = (evt, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = evt.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    };

    selectChangeHandler = (evt) => {
        this.setState({
            rightAnswerId: +evt.target.value,
        });
    };

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
                        onChange={(evt) => this.changeHandler(evt, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            );

        })
    };

    render() {
        const select = <Select
            label='Choose the right answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: '1', value: '1'},
                {text: '2', value: '2'},
                {text: '3', value: '3'},
                {text: '4', value: '4'},
            ]}

        />

        return (

            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create new Quiz</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}
                        {select}

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Add question</Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >Create Quiz</Button>
                    </form>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
