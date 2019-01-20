import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import EditableItemTitle from './EditableItemTitle';

it('renders without crashing', () => {
    let wrapped = null;
	const props = {
		item: { data: { start:111, stop: 222 } }
	};
	
    wrapped = shallow(<EditableItemTitle {...props} />);
	
    expect( wrapped.find('.remove-btn').length ).toBe(1);

});
