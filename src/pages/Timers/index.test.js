import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { TimersPage } from './index';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    intervals: {
        items: [{ key: 'key1' }, { key: 'key2' }],
        loading: false
    },
    fetchIntervalsOnceByDateCurrentUser: () => { },
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<TimersPage {...myProps} />);
    return wrapped;
}

describe('Component TimersPage', () => {
    //RENDER
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'timers-page-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(TimersPage, defaultProps);
    });
});

