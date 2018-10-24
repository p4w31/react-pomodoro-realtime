import React, { Component } from 'react';
import './loading_bars.scss';

function LoadingBars(props) {
    return (
        <div className="loading-bars-wrapper">
            <div className="blocks-wrapper">
                <div id="block_1" className="barlittle"></div>
                <div id="block_2" className="barlittle"></div>
                <div id="block_3" className="barlittle"></div>
                <div id="block_4" className="barlittle"></div>
                <div id="block_5" className="barlittle"></div>
            </div>
        </div>
    );
}

export default LoadingBars;