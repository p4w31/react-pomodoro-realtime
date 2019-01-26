import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { MenuTop } from './MenuTop';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    user: { email: 'testuser@gmail.com', uid: 'uid1' },
    signOut: () => {},
    history: { push: () => {} },
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<MenuTop {...myProps} />);
    return wrapped;
}


describe('Component MenuTop', () => {

    //RENDER
    it('renders without crashing when user not null', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'menu-top-component') ).toHaveLength(1);
    });

    it('not renders when user null', () => {
        wrapped = prepareComponent({ user: null }); 
        expect( findByTestAttr(wrapped, 'menu-top-component') ).toHaveLength(0);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(MenuTop, defaultProps);
    });

    //CONTRACT
    describe('Prop: user', () => {
        it('displays user email', () => {
            wrapped = prepareComponent();
            expect( wrapped.contains(defaultProps.user.email) ).toBe(true);
        });
    });

    describe('Prop: signOut', () => {
        it('call signOut after logout', () => {
            const spySignOut = sinon.stub().resolves({});
            wrapped = prepareComponent({signOut: spySignOut});
            wrapped.find('.logout').simulate('click');
            wrapped.update();
            expect( spySignOut.called ).toBe(true);
        });
    });

    describe('Prop: history', () => {
        it('call history.push after redirect', () => {
            const spyPush = sinon.stub();
            wrapped = prepareComponent({ history: { push: spyPush }, });
            wrapped.find('.menu-link').first().simulate('click');
            expect( spyPush.called ).toBe(true);
        });
    });

});

