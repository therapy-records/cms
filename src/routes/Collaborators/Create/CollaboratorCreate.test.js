import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorCreate from './index';
import CollaboratorForm from '../../../components/CollaboratorForm';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorCreate />);
    });

    describe('<ArticleHeader />', () => {
      it('should render', () => {
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.length).to.eq(1);
        expect(articleHeader.prop('baseUrl')).to.eq('/collaborators');
        expect(articleHeader.prop('heading')).to.eq('Add Collaborator 🌈');
        expect(articleHeader.prop('showDeleteButton')).to.eq(false);
      });

    });

    it('should render <CollaboratorForm />', () => {
      const actual = wrapper.containsMatchingElement(
        <CollaboratorForm />
      );
      expect(actual).to.equal(true);
    });

  });

});
