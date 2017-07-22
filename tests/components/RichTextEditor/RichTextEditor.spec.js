// disabled due to issue with react-rte issue ('doc.body')

/*
import React from 'react'
import RichTextEditor from 'components/RichTextEditor/RichTextEditor'
import { shallow } from 'enzyme'

describe('(Component) RichTextEditor', () => {
  let wrapper,
      props = {
        onChange: () => {},
        value: '<div><p>test</p></div><p>hello</p>'
      }

  beforeEach(() => {
    wrapper = shallow(<RichTextEditor {...props} />)
  });

  it('should render <RichTextEditor /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
      <RichTextEditor value={props.value} onChange={props.onChange} />
    );
    expect(actual).to.equal(true);
  });

  it('should render a link to home', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Go home</button>
    );
    expect(actual).to.equal(true);
  });
});
*/
