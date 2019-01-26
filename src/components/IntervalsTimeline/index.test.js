import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import IntervalsTimeline from './index';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    intervals: [
        { 
            key: 'key1', 
            data: {
                start: 1548056833,
                stop: 1548056833,
                type: 'work'
            }
        },
        { 
            key: 'key2', 
            data: {
                start: 1548056834,
                stop: 1548056836,
                type: 'break'
            }
        }
    ]
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<IntervalsTimeline {...myProps} />);
    return wrapped;
}

describe('Component IntervalsTimeline', () => {

    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'intervals-timeline-component') ).toHaveLength(1);
    });

    it('has valid propTypes', () => {
        checkProps(IntervalsTimeline, defaultProps);
    });

    it('should parse intervals', () => {
        const spy = jest.spyOn(IntervalsTimeline.prototype, 'parseIntervals')
        wrapped = prepareComponent(); 
        
        expect(spy).toHaveBeenCalledWith(defaultProps.intervals);
    });

});

