import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router";
import ModalError from '../../components/ModalError';
import { userActions } from '../../state/ducks/user';
import PropTypes from 'prop-types';

import './loginFormDialog.scss';

const defaultProps = {};

const propTypes = {
    signInWithEmailAndPassword: PropTypes.func,
    verifyAuth: PropTypes.func,
    history: PropTypes.shape({
        push: PropTypes.func
    }),
};

class LoginFormDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputUser: '',
            inputPassword: '',
            modalError: false
        };

        //this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.verify();
    }

    inputUserChange = (event) => {
        this.setState({ inputUser: event.target.value });
    }

    inputPasswordChange = (event) => {
        this.setState({ inputPassword: event.target.value });
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    login = (event) => {
    //login(event) {
        event.preventDefault();

        this.props.signInWithEmailAndPassword(this.state.inputUser, this.state.inputPassword)
            .then((authData) => {
                this.props.history.push('/timers');
            })
            .catch((err) => {
                this.toggleError();
            });
    }

    verify = () => {
        this.props.verifyAuth();
    }

    render() {
        return (
            <form className="login-form-dialog-wrapper"
                onSubmit={this.login}
                data-test="login-form-dialog-component"
            >
                <div>
                    <label htmlFor="email" >Email</label>
                    <input id="email"
                        value={this.state.inputUser}
                        onChange={this.inputUserChange}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="password" >Password</label>
                    <input id="password"
                        value={this.state.inputPassword}
                        onChange={this.inputPasswordChange}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>

                <ModalError 
                    isOpen={this.state.modalError} 
                    toggle={this.toggleError} 
                    message="Wrong user or password" 
                />
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signInWithEmailAndPassword: userActions.signInWithEmailAndPassword,
        verifyAuth: userActions.verifyAuth,
    }, dispatch);
}

LoginFormDialog.defaultProps = defaultProps;
LoginFormDialog.propTypes = propTypes;

export { LoginFormDialog };

export default connect(null, mapDispatchToProps)(withRouter(LoginFormDialog));