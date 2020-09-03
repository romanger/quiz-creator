import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const links = [
    {to: '/', label: 'Quiz list', exact: true},
    {to: '/auth', label: 'Sign up', exact: false},
    {to: '/quiz-creator', label: 'Create Quiz', exect: false},
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks() {
        return links.map((link, i) => {
            return (
                <li key={i}>
                    <NavLink
                    exact={link.exact}
                    activeClassName={classes.active}
                    to={link.to}
                    onClick={this.clickHandler}
                    >{link.label}</NavLink>
                </li>
            )
        });
    };

    render() {
        const { isOpen, onClose } = this.props;
        const cls = [classes.Drawer]

        if (!isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                { isOpen ? <Backdrop onClick={onClose} /> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </React.Fragment>
        );
    };
};

export default Drawer;
