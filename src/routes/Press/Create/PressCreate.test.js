import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PressCreate from './index';
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import Form from '../../../components/Form';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PressCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<PressCreate />);
    });

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Add Press 📢</h2>
      );
      expect(actual).to.equal(true);
    });


    it('should render <Form />', () => {
      const actual = wrapper.containsMatchingElement(
        <Form
          mutation={CREATE_PRESS}
          fields={new FormFields().press}
          refetchQueries={[
            { query: GET_PRESS }
          ]}
          baseUrl='/press'
          submitButtonCopy='Add Press'
          successCopy={{
            success: 'Successfully created!',
            homeLink: 'Go to Press',
            createLink: 'Create another Press article'
          }}
        />
      );
      expect(actual).to.equal(true);
    });

  });

});
