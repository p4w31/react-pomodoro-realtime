import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
import PropTypes from 'prop-types';
import './intervalsTimeline.scss';

const defaultProps = {};
  
const propTypes = {
    intervals: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        data: PropTypes.shape({
            start: PropTypes.number,
            stop: PropTypes.number,
            type: PropTypes.string
        }),
    }))
};

class IntervalsTimeline extends Component {
    constructor (props) {
        super(props);

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

        this.parsedIntervals = [];
        
        this.parseIntervals = this.parseIntervals.bind(this);
    }
    
    parseIntervals(intervals) {
        this.parsedIntervals = _.map(intervals, (item) => ({
            start: moment.unix(item.data.start).format(),
            end: moment.unix(item.data.stop).format(),
            content: item.data.type, 
            group: item.data.type === 'work' ? 0 : 1 
        }));

        return true;
    }

    render () {
        const {
            intervals
        } = this.props;

        return (
            <div className="intervals-timeline-wrapper" data-test="intervals-timeline-component">
                { ( this.parseIntervals( intervals ) )
                    && <Timeline
                        ref={ this.timelineWrapperRef }
                        options={ this.options }
                        items={ this.parsedIntervals }
                        groups={ this.groups }
                    />
                }
            </div>
        );
    }
}

IntervalsTimeline.defaultProps = defaultProps;
IntervalsTimeline.propTypes = propTypes;

export default IntervalsTimeline;