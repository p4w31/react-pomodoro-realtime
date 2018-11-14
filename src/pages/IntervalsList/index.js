import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import withAuthorization from '../../components/with_authorization';
import LoadingBars from '../../components/loading_bars';
import AddRow from './add_row';
import ItemsList from './items_list';
import getUser from '../../selectors/UserSelectors';
import getIntervals from '../../selectors/IntervalsSelectors';
import PropTypes from 'prop-types';

import './index.scss';

const defaultProps = {};
  
const propTypes = {
    user: PropTypes.object,
};

class IntervalsListPage extends Component {
    constructor(props) {
        super(props);
        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            currentDay
        };
    }

    getTextDecoration = (isCompleted) => {
        return isCompleted ? 'line-through' : 'none';
    }

    render() {
        return (
            <div className="intervals-list-page-wrapper">
                <h4>Intervals list</h4>
                <h6>{(this.props.user ? this.props.user.email : 'no user')}</h6>
                <AddRow />
                <ItemsList /> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: getUser(state),
    };
}

IntervalsListPage.defaultProps = defaultProps;
IntervalsListPage.propTypes = propTypes;

export default connect(mapStateToProps)(withAuthorization(IntervalsListPage));