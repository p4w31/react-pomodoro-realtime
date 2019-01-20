import React from 'react';
import './loadingSpinner.scss';

function LoadingSpinner() {
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