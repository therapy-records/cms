import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorCreate from './index';
import CollaboratorForm from '../../../components/CollaboratorForm';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorCreate', () => {
  let wrapper,
      props = {
        formValues: {
          title: 'Test Person'
        },
        location: {
          pathname: '/collaborators/create'
        }
      };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorCreate {...props} />);
    });

    describe('<ArticleHeader />', () => {
      it('should render', () => {
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.length).to.eq(1);
        expect(articleHeader.prop('baseUrl')).to.eq('/collaborators');
        expect(articleHeader.prop('heading')).to.eq('Add Collaborator 🌈');
        expect(articleHeader.prop('showDeleteButton')).to.eq(false);
      });

      describe('when it\'s an `edit` form', () => {
        beforeEach(() => {
          wrapper.setProps({
            location: {
              pathname: 'test/edit'
            }
          })
        });

        it('should render correct props', () => {
          const articleHeader = wrapper.find('ArticleHeader');
          expect(articleHeader.prop('heading')).to.eq(`Editing TEST 🌈`);
          expect(articleHeader.prop('showDeleteButton')).to.eq(true);
        });

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
