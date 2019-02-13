import React from 'react';
import './animatedCounter.scss';
import PropTypes from 'prop-types';

const defaultProps = {};
  
const propTypes = {
    minutesToDisplay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    secondsToDisplay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    shouldAnimate: PropTypes.bool
};

function AnimatedCounter(props) {
    const {
        minutesToDisplay,
        secondsToDisplay,
        shouldAnimate
    } = props;
    
    return (
        <div className="reactor-container" data-test="animated-counter-component">
            <div className="tunnel circle abs-center"></div>
            <div className="core-wrapper circle abs-center"></div>
            <div className="core-outer circle abs-center"></div>
            <div className="core-inner circle abs-center">
                <div className="clock">
                    {minutesToDisplay}:{secondsToDisplay}
                </div>
            </div>
            <div className="coil-container" style={{ animationDuration: (shouldAnimate) ? '60s' : '0s' }}>
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
    );
}

AnimatedCounter.defaultProps = defaultProps;
AnimatedCounter.propTypes = propTypes;

export default AnimatedCounter;