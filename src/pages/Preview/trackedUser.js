import React from 'react';
import PropTypes from 'prop-types';
import IntervalsTimeline from  '../../components/IntervalsTimeline';
import './trackedUser.scss'; 

const defaultProps = {};
  
const propTypes = {
    trackedUser: PropTypes.object
};

function TrackedUser(props) {
    const {
        trackedUser
    } = props;

    return (
        (props.trackedUser)
            && <div className="tracked-user-wrapper">
                <div className="username">
                    <span>{trackedUser.username}</span>
                </div>
                <IntervalsTimeline intervals={ trackedUser.intervals } />
            </div>
    );
}

TrackedUser.defaultProps = defaultProps;
TrackedUser.propTypes = propTypes;

export default TrackedUser;