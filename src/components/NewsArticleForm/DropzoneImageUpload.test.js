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
            title: 'hello test'
        }

    it('should render a title', () => {
        const wrapper = shallow(
            <DropzoneImageUpload {...props} />
        );
        const actual = wrapper.containsMatchingElement(
            <h5>{props.title}</h5>
        );
        expect(actual).to.equal(true);
    });

    // describe('with invalidDimensions', () => {
    //    it('should render messages', () => {
           
    //    });
    // });
});
