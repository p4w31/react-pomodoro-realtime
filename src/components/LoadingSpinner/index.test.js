import React from 'react';
import { mount, shallow, render } from 'enzyme';
import LoadingSpinner from './index';
import  { findByTestAttr } from '../../test/helpers';

let wrapped = null;

describe('Component LoadingBars', () => {

    it('renders without crashing', () => {
        wrapped = shallow(<LoadingSpinner />);
        expect( findByTestAttr(wrapped, 'loading-spinner-component') ).toHaveLength(1);
    });

});

