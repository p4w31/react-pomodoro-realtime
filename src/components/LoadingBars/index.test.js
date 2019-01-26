import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import LoadingBars from './index';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

describe('Component LoadingBars', () => {

    it('renders without crashing', () => {
        wrapped = shallow(<LoadingBars />);
        expect( findByTestAttr(wrapped, 'loading-bars-component') ).toHaveLength(1);
    });

});

