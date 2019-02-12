import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { AddRow } from './AddRow';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    addInterval: () => {}
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<AddRow {...myProps} />);
    return wrapped;
}

describe('Component AddRow', () => {

    //RENDER
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'add-row-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(AddRow, defaultProps);
    });

    //CONTRACT
    describe('Prop: addInterval', () => {
        it('doesnt call addInterval prop when not filling all inputs', () => {
            const spyAddInterval = sinon.stub();
            wrapped = prepareComponent({ addInterval: spyAddInterval });

            wrapped.find('button').simulate('click');
            expect( spyAddInterval.called ).toBe(false);
        });

        it('calls addInterval prop after filling all inputs and "Add" button clicked', () => {
            const spyAddInterval = sinon.stub().resolves({});
            wrapped = prepareComponent({ addInterval: spyAddInterval });

            wrapped.find('Input[name="start"]').simulate('change', { target: { value: '1548159060' } });
            wrapped.find('Input[name="stop"]').simulate('change', { target: { value: '1548162660' } });
            wrapped.find('Input[name="type"]').simulate('change', { target: { value: 'work' } });
            wrapped.find('button').simulate('click');
            expect( spyAddInterval.called ).toBe(true);
        });
    });

});

