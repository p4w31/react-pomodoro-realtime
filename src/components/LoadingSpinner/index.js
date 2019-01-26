import React from 'react';
import './loadingSpinner.scss';

function LoadingSpinner() {
    return (
        <div className="loading-spinner-wrapper" data-test="loading-spinner-component">
            <div className="loader">
                <span id="counter">Loading</span>
                <div className="spinner"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;