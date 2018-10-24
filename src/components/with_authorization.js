import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth } from '../actions/auth';
import LoadingSpinner from './loading_spinner';

const withAuthorization = (WrappedComponent) => {
    class WithAuthorization extends Component {

        componentDidMount() {
            this.props.verifyAuth().then((user) => {
                if( !user ) {
                    this.props.history.push('/login');
                }
            }); 
        }

        render() {
            return (
                ( this.props.user )
                    ? <WrappedComponent {...this.props} />
                    : <LoadingSpinner />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            verifyAuth
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default withAuthorization;
