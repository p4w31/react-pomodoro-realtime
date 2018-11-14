import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import withAuthorization from '../../components/with_authorization';
import AnimatedCounter from './animated_counter';
import IntervalsTimeline from './intervals_timeline';
import CounterButtons from './counter_buttons';
import { fetchIntervalsOnceByDate } from '../../actions/IntervalsActions.js';

import './index.scss';

const defaultProps = {};
  
const propTypes = {
    fetchIntervalsOnceByDate: PropTypes.func,
};

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

TimersPage.defaultProps = defaultProps;
TimersPage.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(withAuthorization(TimersPage));