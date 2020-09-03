import React, { Component } from 'react';
import classes from './Global.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Global extends Component {
    state = {
        menu: false,
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu,
        })
    };

    menuCloseHandler = () => {
        this.setState({
            menu: false,
        })
    };

    render() {

        return (
            <div className={classes.Global}>

                <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Global;
