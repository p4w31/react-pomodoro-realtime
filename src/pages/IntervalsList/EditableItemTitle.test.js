import React from 'react';
import { mount, shallow, render } from 'enzyme';
import EditableItemTitle from './EditableItemTitle';
import sinon from 'sinon';
import  { findByTestAttr, checkProps } from '../../test/helpers';

let wrapped = null;

const defaultProps = {
    item: {
        key: 'key1',
        data: {
            start: 1548159060,
            stop: 1548162660,
            type: 'work'
        }
    },
    removeInterval: () => {},
};

const prepareComponent = (props={}) => {
    const myProps = { ...defaultProps, ...props };
    wrapped = shallow(<EditableItemTitle {...myProps} />);
    return wrapped;
}


describe('Component EditableItemTitle', () => {

    //RENDER
    it('renders without crashing', () => {
        wrapped = prepareComponent();
        expect( findByTestAttr(wrapped, 'editable-item-title-component') ).toHaveLength(1);
    });

    //CHECK PROPS
    it('has valid propTypes', () => {
        checkProps(EditableItemTitle, defaultProps);
    });

    //CONTRACT
    describe('Prop: item', () => {
        it('displays item.data.type inside component', () => {
            wrapped = prepareComponent();
            expect( wrapped.contains(defaultProps.item.data.type) ).toBe(true);
        });
    });

    describe('Prop: removeInterval', () => {
        it('call removeInterval after remove button clicked', () => {
            const spyRemoveInterval = sinon.stub();
            wrapped = prepareComponent({removeInterval: spyRemoveInterval});
            wrapped.find('.remove-btn').simulate('click');
            wrapped.update();
            expect( spyRemoveInterval.called ).toBe(true);
        });
    });

});

