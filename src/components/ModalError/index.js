import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
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

function ModalError(props) {
    const {
        isOpen,
        toggle,
        message
    } = props;

    return (
        <Modal isOpen={isOpen} toggle={toggle} message={message} centered={true}>
            <ModalBody>
                {message}
                <div>
                    <button onClick={toggle}>OK</button>
                </div>
            </ModalBody>
        </Modal>
    );
}

ModalError.defaultProps = defaultProps;
ModalError.propTypes = propTypes;

export default ModalError;