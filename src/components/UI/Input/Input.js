import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const { type, label, value, onChange, errorMessage } = props;
    const cls = [classes.Input];
    const htmlFor = `${type || 'text'}-${Math.random()}`;

    if(isInvalid(props)) {
        cls.push(classes.invalid);
    };

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                id={htmlFor}
                type={type || 'text'}
                value={value}
                onChange={onChange}
            />
            {isInvalid(props) ? <span>{errorMessage || 'Invalid content!'}</span> : null}

        </div>
    );
};

export default Input;
