import React, { Component, Fragment } from "react";
import { getData, clearData } from '../../store/actions/example';
import { connect } from "react-redux";
import { ProgressIndicator } from "office-ui-fabric-react";

class Contact extends Component {

    componentDidMount() {
        const { getData: getDataAction } = this.props;
        getDataAction();
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        const { getDataComponentState, data, getDataErrorMessage } = this.props;
        return (
            <Fragment>
                <p>To get started, edit <code>src/components/Contact/Contact.jsx</code> and save to reload.</p>
                {
                    getDataComponentState === "LOAD_END" && getDataErrorMessage === "" ?
                        <Fragment>
                            <h3><u>Some Data</u></h3>
                            <ul>{
                                data.map((s, index) => (
                                    <li key={index}>{s.title}</li>
                                ))
                            }
                            </ul>
                        </Fragment>
                        : <ProgressIndicator />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    getDataComponentState: state.example.getDataComponentState,
    data: state.example.data,
    getDataErrorMessage: state.example.getDataErrorMessage
});

export default connect(mapStateToProps, { getData, clearData })(Contact);