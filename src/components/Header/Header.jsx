import React, { Component } from "react";
import { DefaultButton } from "office-ui-fabric-react";

import "./Header.scss";
import logo from "./logo.png";

class Header extends Component {
    render() {
        if (!this.props.loggedIn) {
            return (
                <div className="App-header">
                    <div className="logo ms-font-x2">My Application</div>
                </div>
            );
        }

        const { userName } = this.props;
        return (
            <div className="App-header">
                <div className="ms-font-xl"><a href="/"><img src={logo} className="logo" alt="My Application" /></a> My Application</div>
                <div className="rightFloat">
                    <h4 className="welcomeText">
                        <span className="welcomeSpan">Welcome {userName} &nbsp;</span>
                        <DefaultButton onClick={this.props.signOut}>Sign Out</DefaultButton>
                    </h4>
                </div>
            </div>
        );
    }
}

export default Header;