import React, { Component } from "react";
import {
    Route,
    HashRouter
} from "react-router-dom";
import { Fabric, SpinnerSize, Spinner } from "office-ui-fabric-react";
import { initializeIcons } from "@uifabric/icons";

import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Navbar from './components/Navbar/Navbar';
import ActiveDirectoryAuthenticator from "./utils/adal/ActiveDirectoryAuthenticator";
import AdalConfigProvider from "./utils/adal/AdalConfigProvider";

class App extends Component {
    activeDirectoryAuthenticator;

    adalConfigProvider;

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        this.adalConfigProvider = new AdalConfigProvider();
        this.activeDirectoryAuthenticator = new ActiveDirectoryAuthenticator(this.adalConfigProvider);
    }

    componentWillMount() {
        // authenticate
        this.authenticateUser();
    }

    render() {
        // Register icons and pull the fonts from the default SharePoint cdn.
        initializeIcons();

        if (this.activeDirectoryAuthenticator.isAuthenticated) {
            return (
                <HashRouter>
                    <Fabric>
                        <div className="App">
                            <div className="header">
                                <Header {...this.state} signOut={this.signOut} />
                            </div>
                            <div className="body">
                                <div className="content">
                                    <Route key="homeKey" exact path="/" component={Home} />
                                    <Route key="aboutKey" exact path="/about" component={About} />
                                    <Route key="contactKey" exact path="/contact" component={Contact} />
                                </div>
                                <div className="sidebar">
                                    <Navbar />
                                </div>
                            </div>
                            <div className="footer">
                                <Footer />
                            </div>
                        </div>
                    </Fabric>
                </HashRouter>
            );
        }

        return (<div><Spinner size={SpinnerSize.medium} className = "spinner" label="Loading" /></div>);
    }

    authenticateUser() {
        this.activeDirectoryAuthenticator.handleCallback();

        if (!this.activeDirectoryAuthenticator.isAuthenticated) {
            this.activeDirectoryAuthenticator.login();
        }

        this.setState({
            userName: this.activeDirectoryAuthenticator.userInfo === null ? "" : this.activeDirectoryAuthenticator.userInfo.userName,
            loggedIn: true
        });
    }

    signOut() {
        this.activeDirectoryAuthenticator.logout();
    }
}

export default App;
