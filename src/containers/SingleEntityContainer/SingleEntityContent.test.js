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
          releaseDate: 'test',
          createdA: 'test'
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

  describe('<EntityPageHeader />', () => {
    let entityPageHeader;
    beforeEach(() => {
      entityPageHeader = wrapper.find('EntityPageHeader');
    });

    it('should render', () => {
      expect(entityPageHeader.prop('baseUrl')).to.eq(props.baseUrl);
      expect(entityPageHeader.prop('entityCollection')).to.eq(props.entityCollection);
      expect(entityPageHeader.prop('entity')).to.deep.eq({
        _id: props.data._id,
        author: props.data.author,
        releaseDate: props.data.releaseDate,
        createdAt: props.data.createdAt
      });
      expect(entityPageHeader.prop('heading')).to.eq(entityHeading(props.data));
      expect(entityPageHeader.prop('showEditButton')).to.eq(true);
      expect(entityPageHeader.prop('showDeleteButton')).to.eq(props.renderDeleteButton);
    });

    describe('when entityPageHeader onDeleteEntity prop is triggered', () => {
      it('should call props.executeMutation', () => {
        expect(entityPageHeader.prop('onDeleteEntity')).to.be.a('function');
        entityPageHeader.prop('onDeleteEntity')();
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
      const entityPageHeader = wrapper.find('EntityPageHeader');
      const expected = `Editing ${entityHeading(props.data)}`; 
      expect(entityPageHeader.prop('heading')).to.eq(expected);
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
