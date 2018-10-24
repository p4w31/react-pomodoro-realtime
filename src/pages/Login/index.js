import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './index.scss';
import LoginFormDialog from './login_form_dialog';

class LoginPage extends Component {
    
    render() {
        return (
                <div className="login-form-wrapper">
                    <Particles 
                        params={{
                            particles: {
                                line_linked: {
                                    shadow: {
                                        enable: true,
                                        color: "#00f7f7",
                                        blur: 5
                                    }
                                }
                            }
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    <LoginFormDialog />
                </div>
        );
    }

}

export default LoginPage;
