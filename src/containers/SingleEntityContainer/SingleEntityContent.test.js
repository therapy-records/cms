import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleEntityContent from './SingleEntityContent';
import CollaboratorDetails from '../../components/CollaboratorDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('(Container Component) SingleEntityContent', () => {
  let wrapper,
      props = {
        baseUrl: '/test',
        data: {
          _id: '1234',
          name: 'Test',
          about: '<p>test</p>'
        },
        component: CollaboratorDetails,
        executeMutation: () => {},
        renderEditLink: true,
        renderDeleteButton: true
      };

  beforeEach(() => {
    wrapper = shallow(
      <SingleEntityContent {...props} />
    );
  });

  it('should render <ArticleHeader />', () => {
    const articleHeader = wrapper.find('ArticleHeader');
    expect(articleHeader.prop('baseUrl')).to.eq(props.baseUrl);
    expect(articleHeader.prop('article')).to.deep.eq({
      _id: props.data._id
    });
    expect(articleHeader.prop('heading')).to.eq('test heading');
    expect(articleHeader.prop('showEditButton')).to.eq(props.renderEditLink);
    expect(articleHeader.prop('showDeleteButton')).to.eq(props.renderDeleteButton);
    expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
  });

  it('should render component from props with data from query', () => {
    const actual = wrapper.containsMatchingElement(
      props.component({
        ...props.data
      })
    );
    expect(actual).to.equal(true);
  });


});
