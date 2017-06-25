import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import moment from 'moment'
import News from 'routes/News/Home/components/News'

const mockNewsPosts = [
  { title: 'test 1', _id: 'asd123' },
  { title: 'test 2', _id: 'asd124' },
  { title: 'test 3', _id: 'asd125' }
];

describe('(Component) News - Home', () => {
  let wrapper, 
      props,
      baseProps = {
        onFetchNews: () => {},
        newsPosts: mockNewsPosts
      };
  
  it('should render create a new post link', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>Create a new post</Link>
    );
    expect(actual).to.equal(true);
  });

  it('should render list of newsPosts', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const renderNewsPost = (key) => {
      const p = props.newsPosts[key];
      return ( 
        <div key={p._id} className='news-card'>
          <div className='inner'>
            <h3>{p.title}</h3>
            <Link to={`news/${p._id}`} className='btn'>View</Link>
            <Link to={`news/${p._id}/edit`} className='btn'>Edit</Link>
          </div>
        </div>
      )
    };
    console.log(wrapper.debug());
    const child0 = wrapper.containsMatchingElement( renderNewsPost(0) );
    expect(child0).to.equal(true);
    const child1 = wrapper.containsMatchingElement( renderNewsPost(1) );
    expect(child1).to.equal(true);
    const child2 = wrapper.containsMatchingElement( renderNewsPost(2) );
    expect(child2).to.equal(true);
  });

  it('should render an error', () => {
    props = baseProps;
    props.newsPosts = [];
    wrapper = shallow(<News {...props} onFetchNews={() => {}} />);
    const actual = wrapper.containsMatchingElement(
      <p>Unable to fetch news posts :(</p>
    );
    expect(actual).to.equal(true);
  });

});
