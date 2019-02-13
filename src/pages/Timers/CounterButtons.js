import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { counterActions, counterSelectors } from '../../state/ducks/counter';
import { intervalsActions } from '../../state/ducks/intervals';
import moment from 'moment';
import ModalError from '../../components/ModalError';
import PropTypes from 'prop-types';
import { buttonsWorkStructure, buttonsBreakStructure } from './buttonsStructure';

import './counterButtons.scss';

const defaultProps = {};
  
const propTypes = {
    counterDetails: PropTypes.shape({
        flag: PropTypes.oneOf(['not_started', 'started', 'in_progress', 'finished'])
    }),
    setCounterDetails: PropTypes.func,
    addInterval: PropTypes.func,
};

/**
 * TODO: after changing break-work flow add unit test
 */

class CounterButtons extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lastCountdownTime: null,
            lastCountdownType: null,
            shouldChangeButtons: true,
            modalError: false,
            buttonsWork: buttonsWorkStructure,
            buttonsBreak: buttonsBreakStructure 
        };
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    countdown = (seconds, activity) => {
        let startTime = moment().unix();
        let calculatedStopTime = moment().add(seconds, 'seconds').unix();

        this.props.setCounterDetails({
            countdownTime: seconds, 
            countdownStart: startTime, 
            countdownStop: calculatedStopTime, 
            type: activity, 
            flag: 'started'
        });
    }

    manualStop = () => {
        let currentTime = moment().unix();
        let duration = currentTime - this.props.counterDetails.countdownStart;

        this.props.setCounterDetails({
            countdownTime: this.props.counterDetails.countdownTime, 
            countdownStart: this.props.counterDetails.countdownStart, 
            countdownStop: this.props.counterDetails.countdownStart + duration ,
            type: this.props.counterDetails.type, 
            flag: 'finished'
        });

        this.props.addInterval({
            start: this.props.counterDetails.countdownStart,
            stop: this.props.counterDetails.countdownStart + duration,
            type: this.props.counterDetails.type
        })
            .then(() => {
                /**
                 * TODO: add success info in Alert
                 */
            })
            .catch((err) => {
                this.toggleError();
            });
        
    }

    setButtons = () => {
        const shouldBeDisabled = () => {
            if (this.props.counterDetails.flag==="started" ||
                this.props.counterDetails.flag==="in_progress") {
                return true;
            } else {
                return false;
            }
        }

        if (this.props.counterDetails.countdownTime > 0) {

            let currentTime = this.props.counterDetails.countdownTime;
            let currentType = this.props.counterDetails.type;

            let newButtonsWork = _.map(this.state.buttonsWork, (button) => {
                return (button.value === currentTime) && (currentType === 'work')
                    ? { ...button, active: true, disabled: shouldBeDisabled() }
                    : { ...button, active: false, disabled: shouldBeDisabled() }
            })

            let newButtonsBreak = _.map(this.state.buttonsBreak, (button) => {
                return (button.value === currentTime) && (currentType === 'break')
                    ? { ...button, active: true, disabled: shouldBeDisabled() }
                    : { ...button, active: false, disabled: shouldBeDisabled() }
            })

            this.setState({ buttonsBreak: newButtonsBreak, buttonsWork: newButtonsWork });
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.counterDetails.type !== state.lastCountdownType) {
            return {
                lastCountdownType: props.counterDetails.countdownTime,
                shouldChangeButtons: true
            };
        }

        return null;
    }

    componentDidUpdate() {
        if (this.state.shouldChangeButtons === true) {
            this.setButtons();
            this.setState({ shouldChangeButtons: false });
        } 
    }

    render () {
        const {
            counterDetails,
        } = this.props;

        return (
            <div className="counter-with-buttons-wrapper">

                <div className="col-50-percent">
                    <h5>WORK</h5>
                    {_.map(this.state.buttonsWork, (button) => (
                        <button onClick={ () => this.countdown(button.value, 'work') } 
                            className={button.active ? "active" : "not-active"} 
                            disabled={button.disabled}
                            key={ `work-${button.label}` }>
                            {button.label}
                        </button>
                    ))
                    }
                </div>

                <div className="col-50-percent">
                    <h5>BREAKS</h5>
                    {_.map(this.state.buttonsBreak, (button) => (
                        <button onClick={ () => this.countdown(button.value, 'break') } 
                            className={button.active ? "active" : "not-active"} 
                            disabled={button.disabled}
                            key={ `break-${button.label}` }>
                            {button.label}
                        </button>
                    ))
                    }
                </div>

                <div className="col-100-percent">
                    <button onClick={() => this.manualStop('work')} 
                        disabled={counterDetails.flag==="not_started" || 
                        counterDetails.flag==="finished"}>
                        STOP
                    </button>
                </div>

                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="Can't add interval."/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        counterDetails: counterSelectors.getCounterDetails(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        setCounterDetails: counterActions.setCounterDetails,
        addInterval: intervalsActions.addInterval
    }, dispatch);
}

CounterButtons.defaultProps = defaultProps;
CounterButtons.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CounterButtons);