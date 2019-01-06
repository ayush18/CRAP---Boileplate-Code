import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "office-ui-fabric-react";

class Navbar extends Component {
    LINKS = [
        { name: "Home", url: "#/", key: "homeKey", iconProps: { iconName: "Home" } },
        { name: "About", url: "#/about", key: "aboutKey", iconProps: { iconName: "Add" } },
        { name: "Contact", url: "#/contact", key: "contactKey", iconProps: { iconName: "Contact" } },
    ];

    render() {
        return (
            <Nav
                expandedStateText={"expanded"}
                collapsedStateText={"collapsed"}
                selectedKey={this._selectedKey}
                groups={[
                    { links: this.LINKS }
                ]} />

        );
    }

    _selectedKey() {
        const path = this.props.location.pathname;

        if (path.toLowerCase().indexOf("about") > -1) {
            return "aboutKey";
        }
        if (path.toLowerCase().indexOf("contact") > -1) {
            return "contactKey";
        }
        return "homeKey";
    }
}

export default withRouter(Navbar);