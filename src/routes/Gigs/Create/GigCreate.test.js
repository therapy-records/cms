import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GigCreate from './index';
import FormFields from '../../../formFields';
import { CREATE_GIG } from '../../../mutations';
import { GET_GIG } from '../../../queries';
import PageHeader from '../../../components/PageHeader';
import GigForm from '../../../components/GigForm';
import { mapFields } from '../../../utils/form-field-mappings';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GigCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<GigCreate />);
    });

    it('should render <PageHeader />', () => {
      const actual = wrapper.containsMatchingElement(
        <PageHeader heading='Create Gig 🗓️' />
      );
      expect(actual).to.equal(true);
    });


    it('should render <GigForm />', () => {
      const actual = wrapper.containsMatchingElement(
        <GigForm
            fields={mapFields(new FormFields().gig)}
            mutation={CREATE_GIG}
            refetchQueries={[
            { query: GET_GIG }
            ]}
        />
      );
      expect(actual).to.equal(true);
    });

  });

});
