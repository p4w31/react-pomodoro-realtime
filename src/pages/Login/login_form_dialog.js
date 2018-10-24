import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router";
import ModalError from '../../components/modal_error';

import { signInWithEmailAndPassword, verifyAuth, signOut } from '../../actions/auth.js';
import './login_form_dialog.scss';

class LoginFormDialog extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputUser: '',
            inputPassword: '',
            modalError: false 
        };
        
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
        return(
            <form className="login-form-dialog-wrapper" onSubmit={ this.login }>
                <div>
                    <label htmlFor="email" >Email</label>
                    <input id="email"
                    value={ this.state.inputUser } 
                    onChange={ this.inputUserChange } 
                    type="text" 
                    placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password" >Password</label>
                    <input id="password"
                    value={ this.state.inputPassword } 
                    onChange={ this.inputPasswordChange } 
                    type="password" 
                    placeholder="Password" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>

                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="Wrong user or password"/>

            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({
        signInWithEmailAndPassword,
        verifyAuth,
        signOut
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginFormDialog));