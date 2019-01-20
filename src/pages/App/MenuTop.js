import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, userSelectors } from '../../state/ducks/user';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './menuTop.scss';

const defaultProps = {};
  
const propTypes = {
    user: PropTypes.object,
    signOut: PropTypes.func,
    history: PropTypes.object,
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
                <span className="menu-link" onClick={ () => this.redirectTo('preview') }>
                    Preview
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
        const {
            user,
        } = this.props;

        return (
            ( user )
                ? this.renderMenu()
                : null
        );
    }
}

function mapStatsToProps(state) {
    return {
        user: userSelectors.getUser(state)
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signOut: userActions.signOut
    }, dispatch);
}

MenuTop.defaultProps = defaultProps;
MenuTop.propTypes = propTypes;

export default compose(
    withRouter,
    connect(mapStatsToProps, mapDispatchToProps)
)(MenuTop);