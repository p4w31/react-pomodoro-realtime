import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyAuth, userSignedIn,  } from '../actions/auth';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase";

const withAuthentication = (WrappedComponent) => {
    class WithAuthentication extends Component {

        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.userSignedIn(user);
                } else {
                    this.props.userSignedIn(null);
                }
            });
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            verifyAuth,
            userSignedIn
        }, dispatch);
    }

    return connect(null, mapDispatchToProps)(WithAuthentication);

}

export default withAuthentication;
