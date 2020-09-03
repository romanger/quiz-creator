import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from '../AnswersList/AnswersList';

const ActiveQuiz = (props) => {
    const { answers, question, quizLength, questionNumber,state,onAnswerClick } = props;

    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{questionNumber}.</strong>
                    {question}
                </span>
    <small>{questionNumber} of {quizLength}</small>
            </p>
            <AnswersList
                state={state}
                answers={answers}
                onAnswerClick={onAnswerClick}
            />
        </div>
    );
}

export default ActiveQuiz;
