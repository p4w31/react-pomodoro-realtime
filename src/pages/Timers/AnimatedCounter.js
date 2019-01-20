import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterActions, counterSelectors } from '../../state/ducks/counter';
import { intervalsActions } from '../../state/ducks/intervals';
import ModalError from '../../components/ModalError';
import PropTypes from 'prop-types';

import './animatedCounter.scss';

const defaultProps = {};
  
const propTypes = {
    counterDetails: PropTypes.shape({
        flag: PropTypes.oneOf(['not_started', 'started', 'in_progress', 'finished'])
    }),
    setCounterDetailsType: PropTypes.func,
    addInterval: PropTypes.func,
};

class AnimatedCounter extends Component {
    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            diffMinutes: 0,
            diffSeconds: 0,
            currentDay,
            modalError: false 
        };

        this.timerHandler = null;
        this.startTime = null;
        this.calculatedStopTime = null;
    }

    componentDidMount() {
        if (this.props.counterDetails.flag === 'in_progress') {
            let currentTimestamp = moment().unix(); 

            this.countdown( this.props.counterDetails.countdownStop - currentTimestamp, 
                this.props.counterDetails.type);
        }
    }

    componentDidUpdate() {
        if ( this.props.counterDetails.flag === 'started' ) {
            this.countdown( this.props.counterDetails.countdownTime);
            this.props.setCounterDetailsType('in_progress');
        }

        if (this.props.counterDetails.flag === 'finished') {
            this.clearTimer();
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    tick = () => {
        this.timerHandler = setTimeout(() => { this.tick(); }, 190);
        let current = moment(); 

        if ( this.calculatedStopTime.diff(current, 'seconds') >= 0 ) {
            this.setState({ diffMinutes: this.calculatedStopTime.diff(current, 'minutes') });
            this.setState({ diffSeconds: this.calculatedStopTime.diff(current, 'seconds') % 60 });
        } else {
            clearTimeout(this.timerHandler);
            this.props.setCounterDetailsType('finished'); 

            this.props.addInterval({ 
                start: this.startTime.unix(),
                stop: this.calculatedStopTime.unix(),
                type: this.props.counterDetails.type
            }).then(() => {
                    /**
                     * TODO success modal
                     */
                })
                .catch((err) => {
                    this.toggleError();
                });

            this.notifyMe('Interval finished!');
        }
    }

    addCurrentMinutesAndSeconds = () => {
        let result = (this.state.diffMinutes * 60) + (this.state.diffSeconds);
        return result;
    }

    notifyMe = (message) => {
        if (!("Notification" in window)) {
            alert(message);
        }
      
        else if (Notification.permission === "granted") {
            new Notification(message);
        }
      
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    new Notification(message); 
                }
            });
        }
    }

    countdown = (seconds) => {
        clearTimeout(this.timerHandler);
        this.startTime = moment();
        this.calculatedStopTime = moment().add(seconds, 'seconds');
        this.tick();
    }

    clearTimer = () => {
        clearTimeout(this.timerHandler);
    }

    calcCoilAnimation = () => {
        return this.props.counterDetails.flag === 'in_progress' ? '60s' : '0s';
    }

    render() {
        return (
            <div className="counter-with-action-wrapper">
                <div className="reactor-container">
                    <div className="tunnel circle abs-center"></div>
                    <div className="core-wrapper circle abs-center"></div>
                    <div className="core-outer circle abs-center"></div>
                    <div className="core-inner circle abs-center">
                        <div className="clock">
                            {this.state.diffMinutes}:{this.state.diffSeconds}
                        </div> 
                    </div>
                    <div className="coil-container" style={{ animationDuration: this.calcCoilAnimation() }}>
                        <div className="coil coil-1"></div>
                        <div className="coil coil-2"></div>
                        <div className="coil coil-3"></div>
                        <div className="coil coil-4"></div>
                        <div className="coil coil-5"></div>
                        <div className="coil coil-6"></div> 
                        <div className="coil coil-7"></div>
                        <div className="coil coil-8"></div>
                    </div>
                </div>
                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="Can't add interval."/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        counterDetails: counterSelectors.getCounterDetails(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCounterDetailsType: counterActions.setCounterDetailsType,
        addInterval: intervalsActions.addInterval,
    }, dispatch);
}

AnimatedCounter.defaultProps = defaultProps;
AnimatedCounter.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedCounter);