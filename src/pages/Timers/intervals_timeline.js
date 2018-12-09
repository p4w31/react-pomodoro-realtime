import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
import LoadingBars from '../../components/loading_bars';
import { intervalsSelectors } from '../../state/ducks/intervals';
import PropTypes from 'prop-types';

import './intervals_timeline.scss';

const defaultProps = {};
  
const propTypes = {
    intervals: PropTypes.object
};

class IntervalsTimeline extends Component {
    constructor (props) {
        super(props);
        // this.options = {};
        // this.groups = [];

        let todayStartHour = new Date();
        todayStartHour.setHours(5, 0, 0, 0);

        let todayEndHour = new Date();
        todayEndHour.setHours(24, 0);

        this.options = {
            width: '100%',
            height: '130px',
            stack: false,
            showMajorLabels: true,
            showCurrentTime: true,
            zoomMin: 1000000,
            type: 'background',
            format: {
                minorLabels: {
                    minute: 'h:mma',
                    hour: 'ha'
                }
            },
            min: todayStartHour,
            max: todayEndHour,
            start: todayStartHour,
            end: todayEndHour
        };

        this.groups = [
            {id: 0, content: 'Work', value: 1},
            {id: 1, content: 'Break', value: 2}
        ];

        this.items = [];
    }
    
    parseIntervals = () => {
        this.items = _.map(this.props.intervals.items, (item) => ({
            start: moment.unix(item.data.start).format(),
            end: moment.unix(item.data.stop).format(),
            content: item.data.type,
            group: item.data.type === 'work' ? 0 : 1 
        }));

        return true;
    }

    render () {
        return (
            <div className="intervals-timeline-wrapper">
                { (!this.props.intervals.loading && this.parseIntervals())
                    ? <Timeline
                        ref={ this.timelineWrapperRef }
                        options={ this.options }
                        items={ this.items }
                        groups={ this.groups }
                    />
                    : <LoadingBars />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        intervals: intervalsSelectors.getIntervals(state)
    };
}

IntervalsTimeline.defaultProps = defaultProps;
IntervalsTimeline.propTypes = propTypes;

export default connect(mapStateToProps)(IntervalsTimeline);