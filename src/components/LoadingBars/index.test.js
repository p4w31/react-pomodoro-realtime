import React from 'react';
import { mount, shallow, render } from 'enzyme';
import LoadingBars from './index';
import  { findByTestAttr } from '../../test/helpers';

let wrapped = null;

describe('Component LoadingBars', () => {

    it('renders without crashing', () => {
        wrapped = shallow(<LoadingBars />);
        expect( findByTestAttr(wrapped, 'loading-bars-component') ).toHaveLength(1);
    });

});

