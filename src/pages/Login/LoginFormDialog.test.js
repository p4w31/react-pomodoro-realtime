import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { LoginFormDialog } from './LoginFormDialog';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    signInWithEmailAndPassword: () => {},
    verifyAuth: () => {},
    history: {
        push: () => {}
    },
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<LoginFormDialog {...myProps} />);
    return wrapped;
}

describe('Component LoginFormDialog', () => {

    //RENDERING
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'login-form-dialog-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(LoginFormDialog, defaultProps);
    });

    //CONTRACT
    describe('Prop: signInWithEmailAndPassword', () => {
        let spySignInWithEmailAndPassword;

        beforeEach(() => {
            spySignInWithEmailAndPassword = sinon.stub().resolves({});
            wrapped = prepareComponent({ 
                signInWithEmailAndPassword: spySignInWithEmailAndPassword
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should call prop after onSubmit', () => {
            const event = { preventDefault: () => {} };
            wrapped.instance().login(event);

            expect(spySignInWithEmailAndPassword.called).toBe(true);
        });

        it('should call prop with empty parameters from both inputs after onSubmit', () => {
            const event = { preventDefault: () => {} };
            wrapped.instance().login(event);
            
            expect( spySignInWithEmailAndPassword.getCall(0).args[0] ).toBe('');
            expect( spySignInWithEmailAndPassword.getCall(0).args[1] ).toBe('');
        });

        it('should call prop with non empty parameters from both inputs after onSubmit', () => {
            const inputMail = "mail@mail.com";
            const inputPassword = "myPassword";
            wrapped.find('#email').simulate('change', { target: { value: inputMail } });
            wrapped.find('#password').simulate('change', { target: { value: inputPassword } });

            const event = { preventDefault: () => {} };
            wrapped.instance().login(event);
            
            expect( spySignInWithEmailAndPassword.getCall(0).args[0] ).toBe(inputMail);
            expect( spySignInWithEmailAndPassword.getCall(0).args[1] ).toBe(inputPassword);
        });

    });
    
    describe('Prop: verifyAuth', () => {
        it('calls prop on componentDidMount', () => {
            const spyVerifyAuth = sinon.stub().resolves({});
            wrapped = prepareComponent({ 
                verifyAuth: spyVerifyAuth
            });

            expect( spyVerifyAuth.callCount ).toEqual(1);
        });
    });

    describe('Prop: history', () => {
        it('calls history.push method when signInWithEmailAndPassword resolved successfully on login', (done) => {
            const stubSignInWithEmailAndPassword = sinon.stub().resolves({});
            let stubPush = sinon.stub();
            wrapped = prepareComponent({
                signInWithEmailAndPassword: stubSignInWithEmailAndPassword, 
                history: { push: stubPush }
            });

            const event = { preventDefault: () => {} };
            wrapped.instance().login(event);

            stubSignInWithEmailAndPassword().then(() => {
                expect( stubPush.called ).toBe(true);
                done();
            });
        });
    });

});

