import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import ModalError from './index';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    isOpen: true,
    toggle: () => {},
    message: 'Default error message'
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<ModalError {...myProps} />);
    return wrapped;
}

describe('Component ModalError', () => {

    //RENDERING
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'modal-error-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(ModalError, defaultProps);
    });

    //CONTRACT
    describe('Prop: isOpen', () => {
        it('properly pass false to subcomponent', () => {
            wrapped = prepareComponent({ isOpen: false }); 
            expect( wrapped.find('Modal').prop('isOpen') ).toBe(false);
        });

        it('properly pass true to subcomponent', () => {
            wrapped = prepareComponent({ isOpen: true }); 
            expect( wrapped.find('Modal').prop('isOpen') ).toBe(true);
        });
    });
    
    describe('Prop: toggle', () => {
        it('properly pass function to subcomponent', () => {
            const testFunction = () => {};
            wrapped = prepareComponent({ toggle: testFunction}); 
            expect( wrapped.find('Modal').prop('toggle') ).toEqual(testFunction);
        });
    });

    describe('Prop: message', () => {
        it('displays properly message', () => {
            wrapped = prepareComponent({ message: 'My error message' }); 
            expect( wrapped.contains('My error message') ).toBe(true);
        });
    });

});

