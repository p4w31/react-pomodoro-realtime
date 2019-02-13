import React from 'react';
import { mount, shallow, render } from 'enzyme';
import AnimatedCounter from './index';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    minutesToDisplay: '12',
    secondsToDisplay: '34',
    shouldAnimate: false
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<AnimatedCounter {...myProps} />);
    return wrapped;
}

describe('Component AnimatedCounter', () => {
    //RENDERING
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'animated-counter-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(AnimatedCounter, defaultProps);
    });

    //CONTRACT
    describe('Prop: minutesToDisplay', () => {
        it('displays minutes inside component', () => {
            const minutes = 45;
            wrapped = prepareComponent({minutesToDisplay: minutes}); 
            expect( wrapped.contains(minutes) ).toBe(true);
        });
    });
    
    describe('Prop: secondsToDisplay', () => {
        it('displays seconds inside component', () => {
            const seconds = 13;
            wrapped = prepareComponent({secondsToDisplay: seconds}); 
            expect( wrapped.contains(seconds) ).toBe(true);
        });
    });

});

