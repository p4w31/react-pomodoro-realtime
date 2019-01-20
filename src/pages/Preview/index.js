import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import withAuthorization from '../../components/withAuthorization';
import PropTypes from 'prop-types';
import { trackedUsersActions, trackedUsersSelectors } from '../../state/ducks/trackedUsers';
import LoadingBars from '../../components/LoadingBars';
import TrackedUser from './TrackedUser';

import './index.scss';

const defaultProps = {};
  
const propTypes = {
    user: PropTypes.object,
};

class PreviewPage extends Component {
    constructor(props) {
        super(props);
        let currentDay = moment().format('YYYY-MM-DD');
        this.state = {
            currentDay
        };
    }

    displayTrackedUsers = () => {
        return this.props.trackedUsers.items.map((trackedUser) => (
            <TrackedUser trackedUser={trackedUser} key={trackedUser.uid}/>
        ));
    }

    componentDidMount() {
        this.props.fetchTrackedUsers(this.state.currentDay);
    }

    render() {
        const {
            trackedUsers,
        } = this.props;

        return (
            <div className="preview-page-wrapper">
                <h4>Tracked users:</h4>
                { (!trackedUsers.loading )
                    ? this.displayTrackedUsers()
                    : <LoadingBars />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        trackedUsers: trackedUsersSelectors.getTrackedUsers(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTrackedUsers: trackedUsersActions.fetchTrackedUsers,
    }, dispatch);
}

PreviewPage.defaultProps = defaultProps;
PreviewPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(PreviewPage));