import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import withAuthorization from '../../components/with_authorization';
import AnimatedCounter from './animated_counter';
import IntervalsTimeline from './intervals_timeline';
import CounterButtons from './counter_buttons';
import LoadingSpinner from '../../components/loading_spinner';

import { fetchIntervalsOnceByDate } from '../../actions/intervals.js';

import './index.scss';

class TimersPage extends Component {

    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            currentDay
        };
    }

    componentDidMount() {
        this.props.fetchIntervalsOnceByDate( this.state.currentDay );
    }

    render() {
        return (
            <div className="timers-page-wrapper">
                <IntervalsTimeline />
                <AnimatedCounter />
                <CounterButtons />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchIntervalsOnceByDate
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(withAuthorization(TimersPage));