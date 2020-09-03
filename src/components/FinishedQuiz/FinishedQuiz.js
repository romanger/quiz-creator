import React from 'react';
import {Link} from 'react-router-dom';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';


const FinishedQuiz = (props) => {
    const { results, quiz, onRetry } = props;

    const successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {quiz.map((quizItem, i) => {
                    const cls = [
                        'fa',
                        results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[results[quizItem.id]]
                    ]
                    return (
                        <li key={i} >
                            <strong>{i + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p>Answered right {successCount} of {quiz.length}</p>
            <div>
                <Button  type="primary" onClick={onRetry}>Try again</Button>
                <Link to="/"><Button  type="success" onClick={onRetry}>To quiz list</Button></Link>

            </div>
        </div>
    );
}

export default FinishedQuiz;
