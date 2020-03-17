import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PressCreate from './index';
import FormFields from '../../../formFields';
import { CREATE_PRESS } from '../../../mutations';
import { GET_PRESS } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import PressForm from '../../../components/PressForm';
import { mapFields } from '../../../utils/form-field-mappings';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PressCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<PressCreate />);
    });

    it('should render <PageHeader />', () => {
      const actual = wrapper.containsMatchingElement(
        <PageHeader heading='Create Press 📢' />
      );
      expect(actual).to.equal(true);
    });


    it('should render <Form />', () => {
      const actual = wrapper.containsMatchingElement(
        <PressForm
          fields={mapFields(new FormFields().press)}
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
