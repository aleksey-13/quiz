import React, { Component } from 'react';

import MenuToggle from '../../components/Nabigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Nabigation/Drawer/Drawer';

import classes from './Layout.module.css'

class Layout extends Component {

    state = {
        showMenu: false
    }

    toggleMenuHandler = () => {
        this.setState(({showMenu}) => {
            const menu = showMenu;

            return {
                showMenu: !menu
            }
        });
    }

    menuCloseHandler = () => {
        this.setState({
            showMenu: false
        })
    }
    render() {
        const { showMenu } = this.state;

        return (
            <div className={classes.Layout}>

                <Drawer isOpen={showMenu} onClose={this.menuCloseHandler}/>

                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={showMenu}
                />

                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout;
