import React from 'react';
import './loadingBars.scss';
//import { findByTest } from '../../test/helpers';

function LoadingBars() {
    return (
        <div className="loading-bars-wrapper" data-test="loading-bars-component">
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