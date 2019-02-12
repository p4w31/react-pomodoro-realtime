import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { PreviewPage } from './index';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    trackedUsers: {
        items: [
            {  uid: 'uid1', username: 'mail1@mail.com', intervals: [] },
            {  uid: 'uid2', username: 'mail2@mail.com', intervals: [] }
        ],
        loading: false
    },
    fetchTrackedUsers: () => {}
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<PreviewPage {...myProps} />);
    return wrapped;
}

describe('Component PreviewPage', () => {

    //RENDERING
    it('renders without crashing', () => {
        wrapped = prepareComponent(); 
        expect( findByTestAttr(wrapped, 'preview-page-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(PreviewPage, defaultProps);
    });

    /**
     * todo: test contract
     */

});

