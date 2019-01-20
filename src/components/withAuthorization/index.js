import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions, userSelectors } from '../../state/ducks/user';
import LoadingSpinner from '../LoadingSpinner';
import PropTypes from 'prop-types';

const withAuthorization = (WrappedComponent) => {
    const defaultProps = {};
      
    const propTypes = {
        user: PropTypes.object,
        verifyAuth: PropTypes.func,
    };
    
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
            user: userSelectors.getUser(state)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            verifyAuth: userActions.verifyAuth
        }, dispatch);
    }

    WithAuthorization.defaultProps = defaultProps;
    WithAuthorization.propTypes = propTypes;

    return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default withAuthorization;
