import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PressCreate from './index';
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import PressForm from '../../../components/PressForm';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PressCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<PressCreate />);
    });

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Create Press 📢</h2>
      );
      expect(actual).to.equal(true);
    });


    it('should render <Form />', () => {
      const actual = wrapper.containsMatchingElement(
        <PressForm
          fields={new FormFields().press}
          mutation={CREATE_PRESS}
          refetchQueries={[
            { query: GET_PRESS }
          ]}
        />
      );
      expect(actual).to.equal(true);
    });

  });

});
