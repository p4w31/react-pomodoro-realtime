import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/UserActions.js';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import getUser from '../../selectors/UserSelectors';
import PropTypes from 'prop-types';

import './menu_top.scss';

const defaultProps = {};
  
const propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
};

class MenuTop extends Component {
    logout = () => {
        this.props.signOut()
            .then((authData) => {
                this.props.history.push('/login');
            })
            .catch((err) => {
                /**
                 * TODO alert with err
                 */
            });
    }

    redirectTo = (path) => {
        this.props.history.push(`/${path}`);
    }

    renderMenu = () => {
        return (
            <div className="menu-top-wrapper">
                <span className="menu-link" onClick={ () => this.redirectTo('timers') }>
                    Timers
                </span>
                <span className="menu-link" onClick={ () => this.redirectTo('list') }>
                    List
                </span>
                <span className="menu-link logout" onClick={ this.logout }>
                    Logout
                </span>
                <span className="menu-link email" onClick={ () => this.redirectTo('list') }>
                    [{ this.props.user.email }]
                </span>
            </div>
        );
    }

    render() {
        return (
            ( this.props.user )
                ? this.renderMenu()
                : null
        );
    }
}

function mapStatsToProps(state) {
    return {
        user: getUser(state)
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signOut
    }, dispatch);
}

MenuTop.defaultProps = defaultProps;
MenuTop.propTypes = propTypes;

export default compose(
    withRouter,
    connect(mapStatsToProps, mapDispatchToProps)
)(MenuTop);