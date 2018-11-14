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
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} message={props.message} centered={true}>
            <ModalBody>
                {props.message}
                <div>
                    <button onClick={props.toggle}>OK</button>
                </div>
            </ModalBody>
        </Modal>
    );
}

ModalError.defaultProps = defaultProps;
ModalError.propTypes = propTypes;

export default ModalError;