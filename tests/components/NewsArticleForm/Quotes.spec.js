import React from 'react';
import Quotes from 'components/NewsArticleForm/Quotes';
import { shallow } from 'enzyme'

describe('(Component) Quotes', () => {
  let wrapper,
      props = {
        input: {
        }
      },
      mockInputValue = [
        { copy: 'asdfasdf', author: 'rtrtrtrt' },
        { copy: 'qweqweqwe', author: 'asdf' },
        { copy: 'uiouio', author: 'nbvbnvbnvb' },
        { copy: '123', author: 'dfdfdf' }
      ];

  beforeEach(() => {
    wrapper = shallow(
      <Quotes {...props} />
    );
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h5>Quotes</h5>
    );
    expect(actual).to.equal(true);
  });

  it('should render an add more button', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Add another quote</button>
    );
    expect(actual).to.equal(true);
  });

  describe('by default', () => {
    it('should render 3 empty list items with inputs', () => {
      const listItems = wrapper.find('li');
      expect(listItems.length).to.equal(3);
      const actual = wrapper.containsMatchingElement(
        <li>
          <input type='text' placeholder='Amazing performance!' />
          <input type='text' placeholder='Joe Bloggs' />
        </li>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('with quotes in props', () => {
    const props = { input: { value: mockInputValue } };
    beforeEach(() => {
      wrapper = shallow(
        <Quotes {...props} />
      );
    });

    it('should render list items with correct input values', () => {
      const listItems = wrapper.find('li');
      expect(listItems.length).to.equal(4);
      const actual0 = wrapper.containsMatchingElement(
        <li>
          <input
            type='text'
            placeholder={props.input.value[0].copy}
            value={props.input.value[0].copy}
          />
          <input
            type='text'
            placeholder={props.input.value[0].author}
            value={props.input.value[0].author}
          />
        </li>
      );
      expect(actual0).to.equal(true);
    });
  });

  describe('on input change(s)', () => {
    beforeEach(() => {
      props = {
        input: {
          onChange: sinon.spy()
        }
      };
      wrapper = shallow(
        <Quotes {...props} />
      );
    });
    it('should call props.input.onChange', () => {
      const firstListItem = wrapper.find('li').first();
      const inputCopy = firstListItem.find('input').first();
      const inputAuthor = firstListItem.find('input').last();

      let mockEv = {
        target: { value: 'testingA' }
      };
      inputCopy.simulate('change', mockEv);
      props.input.onChange.should.have.been.called;
      props.input.onChange.should.have.been.called.once;

      mockEv = {
        target: { value: 'testingB' }
      };
      inputAuthor.simulate('change', mockEv);
      props.input.onChange.should.have.been.called;
      props.input.onChange.should.have.been.called.once;
    });
    it('should call props.input.onChange with no empty objects', () => {
      const firstListItem = wrapper.find('li').first();
      const inputCopy = firstListItem.find('input').first();

      let mockEv = {
        target: { value: 'testingA' }
      };
      const expectedQuotes = [
        { copy: mockEv.target.value }
      ];
      inputCopy.simulate('change', mockEv);
      props.input.onChange.should.have.been.called;
      props.input.onChange.should.have.been.calledWith(expectedQuotes);
    });
  });

  describe('onClick add more button', () => {
    it('should add a quotes/items field', () => {
      let listItems = wrapper.find('li');
      expect(listItems.length).to.equal(3);
      const button = wrapper.find('button');
      button.simulate('click');
      listItems = wrapper.find('li');
      expect(listItems.length).to.equal(4);
      button.simulate('click');
      listItems = wrapper.find('li');
      expect(listItems.length).to.equal(5);
    });
  });
});
