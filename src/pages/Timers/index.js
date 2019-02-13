import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import withAuthorization from '../../components/withAuthorization';
import withLoadingBars from '../../components/withLoadingBars';
import AnimatedCounterContainer from './AnimatedCounterContainer';
import IntervalsTimeline from '../../components/IntervalsTimeline';
import CounterButtons from './CounterButtons';
import { intervalsActions, intervalsSelectors } from '../../state/ducks/intervals';

import './index.scss';

const defaultProps = {};
  
const propTypes = {
    intervals: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            data: PropTypes.shape({
                start: PropTypes.number,
                stop: PropTypes.number,
                type: PropTypes.string
            }),
        })),
        loading: PropTypes.bool
    }),
    fetchIntervalsOnceByDateCurrentUser: PropTypes.func,
};

const IntervalsTimelineWithLoadingBars = withLoadingBars(IntervalsTimeline);

class TimersPage extends Component {

    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            currentDay
        };
    }

    componentDidMount() {
        this.props.fetchIntervalsOnceByDateCurrentUser( this.state.currentDay );
    }

    render() {
        const {
            intervals,
        } = this.props;

        return (
            <div className="timers-page-wrapper" data-test="timers-page-component">
                <IntervalsTimelineWithLoadingBars 
                    isLoading={intervals.loading} 
                    intervals={intervals.items} 
                />
                <AnimatedCounterContainer />
                <CounterButtons />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        intervals: intervalsSelectors.getIntervals(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchIntervalsOnceByDateCurrentUser: intervalsActions.fetchIntervalsOnceByDateCurrentUser,
    }, dispatch);
}

TimersPage.defaultProps = defaultProps;
TimersPage.propTypes = propTypes;

export { TimersPage };

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(TimersPage));