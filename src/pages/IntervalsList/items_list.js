import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import LoadingBars from '../../components/loading_bars';
import ModalError from '../../components/modal_error';
import EditableItemTitle from './editable_item_title';
import { removeIntervalByDate, fetchIntervalsOnceByDate } from '../../actions/IntervalsActions.js';
import getIntervals from '../../selectors/IntervalsSelectors';
import PropTypes from 'prop-types';

import './items_list.scss';

const defaultProps = {};
  
const propTypes = {
    intervals: PropTypes.object,
    removeIntervalByDate: PropTypes.func,
    fetchIntervalsOnceByDate: PropTypes.func,
};

class ItemsList extends Component{
    constructor(props) {
        super(props);

        let currentDay = moment().format('YYYY-MM-DD');

        this.state = {
            currentDay,
            modalError: false 
        };
    }

    componentDidMount() {
        this.props.fetchIntervalsOnceByDate( this.state.currentDay );
    }

    toggleError = (event) => {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    removeInterval = (val) => {
        this.props.removeIntervalByDate(val, this.state.currentDay)
            .then(() => {
                /**
                 * TODO success alert
                 */
            })
            .catch((err) => {
                this.toggleError();
            });
    }

    displayItems = () => {
        if (this.props.intervals.items.length > 0) {
            return _.map(this.props.intervals.items, (item) => (
                <EditableItemTitle 
                    item={item} 
                    removeInterval={this.removeInterval} 
                    key={item.key}
                />
            ));
        } else {
            return <tr><td colSpan="3">no intervals</td></tr>
        }
        
    }

    render() {
        return (
            <div className="items-list-wrapper">
                <table>
                    <thead>
                        <tr>
                            <td>start</td>
                            <td>stop</td>
                            <td>type</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { (this.props.intervals.loading) 
                            ? <tr><td colSpan="3"><LoadingBars /></td></tr>
                            : this.displayItems()
                        }
                    </tbody>
                </table>
                <ModalError isOpen={this.state.modalError} toggle={this.toggleError} message="Can't remove interval."/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        intervals: getIntervals(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeIntervalByDate,
        fetchIntervalsOnceByDate
    }, dispatch);
}

ItemsList.defaultProps = defaultProps;
ItemsList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);