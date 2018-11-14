import React from 'react';
import './loading_spinner.scss';

function LoadingSpinner(props) {
    return (
        <div className="loading-spinner-wrapper">
            <div className="loader">
                <span id="counter">Loading</span>
                <div className="spinner"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;