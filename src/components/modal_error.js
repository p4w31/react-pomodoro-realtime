import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './modal.scss';

class ModalError extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} message={this.props.message} centered={true}>
                <ModalBody>
                    {this.props.message}
                    <div>
                        <button onClick={this.props.toggle}>OK</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    };
}

export default ModalError;