import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { IntervalsListPage } from './index';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    user: { email: 'testuser@gmail.com', uid: 'uid1' }
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<IntervalsListPage {...myProps} />);
    return wrapped;
}


describe('Component IntervalsListPage', () => {

    //RENDER
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'intervals-list-page-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(IntervalsListPage, defaultProps);
    });

    //CONTRACT
    describe('Prop: user', () => {
        it('displays user email', () => {
            wrapped = prepareComponent();
            expect( wrapped.contains(defaultProps.user.email) ).toBe(true);
        });

        it('shows placeholder when no user email', () => {
            wrapped = prepareComponent({user: null});
            expect( wrapped.contains('no user email') ).toBe(true);
        });
    });

});

