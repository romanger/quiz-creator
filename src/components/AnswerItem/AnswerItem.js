import React from "react";
import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
    const { answer, state, onAnswerClick } = props;
    const classList = [classes.AnswerItem]

    if (state) {
        classList.push(classes[state]);
    }

    return (
        <li className={classList.join(' ')}
            onClick={() => { onAnswerClick(answer.id) }}>
            {answer.text}
        </li>
    );
}

export default AnswerItem;
