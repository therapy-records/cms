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
        // isEdit: true,
        renderDeleteButton: true
      };

  beforeEach(() => {
    wrapper = shallow(
      <SingleEntityContent {...props} />
    );
  });

  describe('<ArticleHeader />', () => {
    let articleHeader;
    beforeEach(() => {
      articleHeader = wrapper.find('ArticleHeader');
    });

    it('should render', () => {
      expect(articleHeader.prop('baseUrl')).to.eq(props.baseUrl);
      expect(articleHeader.prop('article')).to.deep.eq({
        _id: props.data._id,
        author: props.data.author,
        releaseDate: props.data.releaseDate,
        createdAt: props.data.createdAt
      });
      expect(articleHeader.prop('heading')).to.eq(entityHeading(props.data));
      expect(articleHeader.prop('showEditButton')).to.eq(true);
      expect(articleHeader.prop('showDeleteButton')).to.eq(props.renderDeleteButton);
    });

    describe('when articleHeader onDeleteArticle prop is triggered', () => {
      it('should call props.executeMutation', () => {
        expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
        articleHeader.prop('onDeleteArticle')();
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
      const articleHeader = wrapper.find('ArticleHeader');
      const expected = `Editing ${entityHeading(props.data)}`; 
      expect(articleHeader.prop('heading')).to.eq(expected);
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
