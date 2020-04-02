import React, { Component } from "react";
import {connect} from "react-redux";

import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState(({ menu }) => {
      const menuHandler = menu;
      return {
        menu: !menuHandler
      };
    });
  };

  render() {
    const { menu } = this.state;
    const { isAuthenticated, children } = this.props;

    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={menu}
          onClose={this.toggleMenuHandler}
          isAuthenticated={isAuthenticated}
        />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
        <main>{children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

export default connect(mapStateToProps)(Layout);
