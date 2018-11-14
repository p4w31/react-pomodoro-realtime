import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import './modal.scss';

const defaultProps = {
    message: 'Error',
  };
  
const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    message: PropTypes.string,
};

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

ModalError.defaultProps = defaultProps;
ModalError.propTypes = propTypes;

export default ModalError;