import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleEntityContent from './SingleEntityContent';
import CollaboratorDetails from '../../components/CollaboratorDetails';
import entityHeading from '../../utils/entityHeading';

Enzyme.configure({ adapter: new Adapter() });

describe('(Container Component) SingleEntityContent', () => {
  let wrapper,
      props = {
        baseUrl: '/test',
        entityCollection: 'collaborators',
        data: {
          _id: '1234',
          name: 'Test',
          about: '<p>test</p>',
          author: 'test',
          categoryId: 1,
          releaseDate: 'test',
          createdAt: 'test',
          avatar: {
            cloudinaryUrl: 'test.com',
            cloudinaryPublicId: '1234',
          }
        },
        render: CollaboratorDetails,
        executeMutation: sinon.spy(),
        renderDeleteButton: true
      };

  beforeEach(() => {
    wrapper = shallow(
      <SingleEntityContent {...props} />
    );
  });

  describe('<PageHeader />', () => {
    let pageHeader;
    beforeEach(() => {
      pageHeader = wrapper.find('PageHeader');
    });

    it('should render', () => {
      expect(pageHeader.prop('baseUrl')).to.eq(props.baseUrl);
      expect(pageHeader.prop('entityCollection')).to.eq(props.entityCollection);
      expect(pageHeader.prop('entity')).to.deep.eq({
        _id: props.data._id,
        author: props.data.author,
        categoryId: props.data.categoryId,
        releaseDate: props.data.releaseDate,
        createdAt: props.data.createdAt
      });
      expect(pageHeader.prop('heading')).to.eq(entityHeading(props.data));
      expect(pageHeader.prop('renderEditButton')).to.eq(true);
      expect(pageHeader.prop('renderDeleteButton')).to.eq(props.renderDeleteButton);
    });

    describe('when pageHeader onDeleteEntity prop is triggered', () => {
      it('should call props.executeMutation', () => {
        expect(pageHeader.prop('onDeleteEntity')).to.be.a('function');
        pageHeader.prop('onDeleteEntity')();
        expect(props.executeMutation).to.have.been.called;
      });
    });

  });

  describe('with props.isEdit', () => {
    beforeEach(() => {
      wrapper.setProps({
        isEdit: true
      });
    });
    it('should pass a different heading prop', () => {
      const pageHeader = wrapper.find('PageHeader');
      const expected = `Editing ${entityHeading(props.data)}`; 
      expect(pageHeader.prop('heading')).to.eq(expected);
    });
  });

  it('should render component from props.render with data from query', () => {
    const actual = wrapper.containsMatchingElement(
      props.render({
        ...props.data
      })
    );
    expect(actual).to.equal(true);
  });

});
