import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { ItemsList } from './ItemsList';
import sinon from 'sinon';
import { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    intervals: {
        items: [{ key: 'key1' }, { key: 'key2' }],
        loading: false
    },
    removeIntervalByDate: () => { },
    fetchIntervalsOnceByDateCurrentUser: () => { },
};

const prepareComponent = (props = {}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<ItemsList {...myProps} />);
    return wrapped;
}

describe('Component ItemsList', () => {

    //RENDER
    it('renders without crashing', () => {
        wrapped = prepareComponent();
        expect(findByTestAttr(wrapped, 'items-list-component')).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(ItemsList, defaultProps);
    });

    //CONTRACT
    describe('Prop: intervals', () => {

        it('displays loading bars during fetching data', () => {
            const newIntervals = {
                ...defaultProps.intervals,
                loading: true
            }
            wrapped = prepareComponent({ intervals: newIntervals });

            expect(wrapped.find('LoadingBars')).toHaveLength(1);
        });

        it('displays proper number of intervals.items', () => {
            wrapped = prepareComponent();

            expect(wrapped.find('EditableItemTitle')).toHaveLength(defaultProps.intervals.items.length);
        });

        it('displays "no intervals" placeholder when intervals.items is empty', () => {
            const newIntervals = {
                ...defaultProps.intervals,
                items: []
            }
            wrapped = prepareComponent({ intervals: newIntervals });

            expect(findByTestAttr(wrapped, 'no-intervals-msg')).toHaveLength(1);
        });
    });

    describe('Prop: removeIntervalByDate', () => {
        it('should call prop inside callback passed to EditableItemTitle as removeInterval', () => {
            const spyRemoveIntervalByDate = sinon.stub().resolves({});
            wrapped = prepareComponent({ removeIntervalByDate: spyRemoveIntervalByDate });

            //find and call function on first EditableItemTitle
            const removeIntervalOnEditableItemTitle =
                wrapped.find('EditableItemTitle').first().prop('removeInterval');
            removeIntervalOnEditableItemTitle();

            //check if spy is called
            expect(spyRemoveIntervalByDate.called).toBe(true);
        });
    });

    describe('Prop: fetchIntervalsOnceByDateCurrentUser', () => {
        it('call on componentDidMount', () => {
            const spyFetchIntervalsOnceByDateCurrentUser = sinon.stub();
            wrapped = prepareComponent({ 
                fetchIntervalsOnceByDateCurrentUser: spyFetchIntervalsOnceByDateCurrentUser 
            });
            
            expect( spyFetchIntervalsOnceByDateCurrentUser.called ).toBe(true);
        });
    });

});

