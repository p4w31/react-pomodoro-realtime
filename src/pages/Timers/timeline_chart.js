import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchWeather } from '../actions/index';

class TimelineChart extends Component {
    render () {
        return (
            <div className="timeline-chart-wrapper">timeline chart here...</div>
        );
    }
}

/*function mapStateToProps(state) {
    return {
        tileList: state.tileList,
        tileNumber: state.tileNumber
    };
}*/

/*function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchWeather: fetchWeather
    }, dispatch);
}*/

export default TimelineChart;
//export default connect(null, mapDispatchToProps)(SearchBar);