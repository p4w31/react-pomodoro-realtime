import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { setCounterDetails } from '../../actions/CounterActions';
import { addInterval } from '../../actions/IntervalsActions';
import moment from 'moment';
import './counter_buttons.scss';
import ModalError from '../../components/modal_error';
import getIntervals from '../../selectors/IntervalsSelectors';
import getCounterDetails from '../../selectors/CounterSelectors';

class CounterButtons extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lastCountdownTime: null,
            lastCountdownType: null,
            shouldChangeButtons: true,
            modalError: false,
            buttonsWork: [
                {
                    label: '25m',
                    value: 1500,
                    active: false,
                    disabled: false
                },
                {
                    label: '30m',
                    value: 1800,
                    active: false,
                    disabled: false
                },
                {
                    label: '40m',
                    value: 2400,
                    active: false,
                    disabled: false
                },
                {
                    label: '1h',
                    value: 3600,
                    active: false,
                    disabled: false
                }
            ],
            buttonsBreak: [
                {
                    label: '5m',
                    value: 300,
                    active: false,
                    disabled: false
                },
                {
                    label: '10m',
                    value: 600,
                    active: false,
                    disabled: false
                },
                {
                    label: '15',
                    value: 900,
                    active: false,
                    disabled: false
                },
                {
                    label: '1,5h',
                    value: 5400,
                    active: false,
                    disabled: false
                }
            ]
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

        this.props.setCounterDetails(seconds, startTime, calculatedStopTime, activity, 'started');
    }

    manualStop = () => {
        let currentTime = moment().unix();
        let duration = currentTime - this.props.counterDetails.countdownStart;

        this.props.setCounterDetails(this.props.counterDetails.countdownTime, 
            this.props.counterDetails.countdownStart, 
            this.props.counterDetails.countdownStart + duration ,
            this.props.counterDetails.type, 
            'finished');

        this.props.addInterval({
            start: this.props.counterDetails.countdownStart,
            stop: this.props.counterDetails.countdownStart + duration,
            type: this.props.counterDetails.type
        })
            .then(() => {
                /**
                 * TODO: add success info in popup
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
            let newButtonsWork = _.map(this.state.buttonsWork, (button) => {
                return (button.value === currentTime)
                    ? { ...button, active: true, disabled: shouldBeDisabled() }
                    : { ...button, active: false, disabled: shouldBeDisabled() }
            } )

            let newButtonsBreak = _.map(this.state.buttonsBreak, (button) => {
                return (button.value === currentTime)
                    ? { ...button, active: true, disabled: shouldBeDisabled() }
                    : { ...button, active: false, disabled: shouldBeDisabled() }
            } )

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
                        disabled={this.props.counterDetails.flag==="not_started" || 
                        this.props.counterDetails.flag==="finished"}>
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
        counterDetails: getCounterDetails(state),
        intervals: getIntervals(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        setCounterDetails: setCounterDetails,
        addInterval: addInterval
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterButtons);