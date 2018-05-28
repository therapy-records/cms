import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DropzoneImageUpload from './DropzoneImageUpload';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DropzoneImageUpload', () => {
    let wrapper,
        props = {
            input: {
                onChange: () => {}
            },
            title: 'hello test',
            minImageDimensions: {
                width: 400,
                height: 400,
            }
        };

    beforeEach(() => {
        wrapper = shallow(
            <DropzoneImageUpload {...props} />
        );
    });

    it('should render a title', () => {
        const actual = wrapper.containsMatchingElement(
            <h5>{props.title}</h5>
        );
        expect(actual).to.equal(true);
    });

    it('should render a minImageDimensions message', () => {
        const actual = wrapper.containsMatchingElement(
            <p>Image must be at least {props.minImageDimensions.width}px x {props.minImageDimensions.height}px</p>
        );
        expect(actual).to.equal(true);
    });

});
