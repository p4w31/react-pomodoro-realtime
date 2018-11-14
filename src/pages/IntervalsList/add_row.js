import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { addInterval } from '../../actions/IntervalsActions';
import ModalError from '../../components/modal_error';
import PropTypes from 'prop-types';

import './add_row.scss';

const defaultProps = {};
  
const propTypes = {
    addInterval: PropTypes.func, 
};

class AddRow extends Component {
    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            inputNewTaskStart: '',
            inputNewTaskStartTimestamp: '',
            inputNewTaskStop: '',
            inputNewTaskStopTimestamp: '',
            selectType: 'select',
            currentDay,
            modalError: false 
        };
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    clearNewTaskInputs = () => {
        this.setState({inputNewTaskStart: ''});
        this.setState({inputNewTaskStop: ''});
        this.setState({selectType: 'select'});
    }

    addInterval = () => {
        if (this.state.inputNewTaskStartTimestamp
            && this.state.inputNewTaskStopTimestamp
            && this.state.selectType !=='select') {
            this.props.addInterval({
                start: this.state.inputNewTaskStartTimestamp,
                stop: this.state.inputNewTaskStopTimestamp,
                type: this.state.selectType
            })
                .then((data) => {
                    this.clearNewTaskInputs();
                });
        } else {
            this.toggleError();
        }
        
    }

    inputNewTaskStartChange = (event) => {
        let hour = event.target.value.split(':')[0];
        let minutes = event.target.value.split(':')[1];
        let current = moment(); 
        
        current.hour(hour);
        current.minute(minutes);
        current.second(0);

        this.setState({inputNewTaskStart: event.target.value});
        this.setState({inputNewTaskStartTimestamp: current.unix()});
    }

    inputNewTaskStopChange = (event) => {
        let hour = event.target.value.split(':')[0];
        let minutes = event.target.value.split(':')[1];
        let current = moment(); 
        
        current.hour(hour);
        current.minute(minutes);
        current.second(0);

        this.setState({inputNewTaskStop: event.target.value});
        this.setState({inputNewTaskStopTimestamp: current.unix()});
    }

    selectNewTaskTypeChange = (event) => {
        this.setState({ selectType: event.target.value });
    }

    render() {
        return (
            <div className="add-row-wrapper">
                <FormGroup>
                    <Label for="start">Start</Label>
                    <Input type="time" name="start" id="start" 
                        value={ this.state.inputNewTaskStart } 
                        onChange={ this.inputNewTaskStartChange } />
                </FormGroup>

                <FormGroup>
                    <Label for="stop">Stop</Label>
                    <Input type="time" name="stop" id="stop" 
                        value={ this.state.inputNewTaskStop } 
                        onChange={ this.inputNewTaskStopChange } />
                </FormGroup>

                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="select" name="type" id="type"
                            onChange={ this.selectNewTaskTypeChange } value={ this.state.selectType }>
                        <option value="select">Select type</option>
                        <option value="break">Break</option>
                        <option value="work">Work</option>
                    </Input>
                </FormGroup>
                
                <button onClick={ this.addInterval }>ADD</button>

                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="You must fill in all of the fields"/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addInterval: addInterval
    }, dispatch);
}

AddRow.defaultProps = defaultProps;
AddRow.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(AddRow);