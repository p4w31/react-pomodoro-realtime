import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../state/ducks/user';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase";
import PropTypes from 'prop-types';

const withAuthentication = (WrappedComponent) => {
    const defaultProps = {};
      
    const propTypes = {
        userChanged: PropTypes.func,
    };

    class WithAuthentication extends Component {

        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.userChanged(user);
                } else {
                    this.props.userChanged(null);
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
            userChanged: userActions.userChanged,
        }, dispatch);
    }

    WithAuthentication.defaultProps = defaultProps;
    WithAuthentication.propTypes = propTypes;

    return connect(null, mapDispatchToProps)(WithAuthentication);

}

export default withAuthentication;
