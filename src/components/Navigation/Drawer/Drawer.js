import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks(links) {
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
        const cls = [classes.Drawer];

        if (!isOpen) {
            cls.push(classes.close);
        }

        const links = [
            {to: '/', label: 'Quiz list', exact: true}
        ];

        if(this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create Quiz', exect: false});
            links.push({to: '/logout', label: 'Logout', exact: false});
        } else  {
            links.push({to: '/auth', label: 'Sign up', exact: false});
        }

        return (
            <React.Fragment>
                { isOpen ? <Backdrop onClick={onClose} /> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </React.Fragment>
        );
    };
};

export default Drawer;
