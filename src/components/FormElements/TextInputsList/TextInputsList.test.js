import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import TextInputsList from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextInputsList', () => {
  let wrapper;
  const props = {
    name: 'collaborators',
    label: 'Collaborated on',
    fieldsetLegend: 'collaborators',
    heading: 'URLs',
    items: [
      {
        id: 'test',
        value: 'testA',
        type: 'text',
        placeholder: 'test'
      },
      {
        id: 'test',
        value: 'testB',
        type: 'tel',
        placeholder: 'test'
      },
      {
        value: 'testB',
        type: 'email',
        placeholder: 'test',
      }
    ],
    onChange: sinon.spy()
  };

  beforeEach(() => {
    wrapper = shallow(
      <TextInputsList {...props} />
    );
  });

  it('should render correct container class name', () => {
    expect(wrapper.find('.text-inputs-list').length).to.eq(1);
  });


  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h5>{props.heading}</h5>
    );
    expect(actual).to.eq(true);
  });

  describe('with props.showAddRemove', () => {
    beforeEach(() => {
      wrapper.setProps({
        showAddRemove: true
      });
    });

    it('should render correct container class name', () => {
      expect(wrapper.find('.text-inputs-list').length).to.eq(1);
      expect(wrapper.find('.text-inputs-list-with-add-remove').length).to.eq(1);
    });

    it('should render a list of inputs and `remove` button', () => {
      const actual = wrapper.containsAllMatchingElements([
        <li key={0}>
          <input
            id={`${props.name}.${props.items[0].id}`}
            name={`${props.name}.${props.items[0].id}`}
            type={props.items[0].type}
            value={props.items[0].value}
            placeholder={props.items[0].placeholder}
          />
          <button>Remove</button>
        </li>,
        <li key={1}>
          <input
            id={`${props.name}.${props.items[1].id}`}
            name={`${props.name}.${props.items[1].id}`}
            type={props.items[1].type}
            value={props.items[1].value}
            placeholder={props.items[1].placeholder}
          />
          <button>Remove</button>
        </li>,
        <li key={2}>
          <input
            id={`${props.name}.2`}
            name={`${props.name}.2`}
            type={props.items[2].type}
            value={props.items[2].value}
            placeholder={props.items[2].placeholder}
          />
          <button>Remove</button>
        </li>
      ]);
      expect(actual).to.eq(true);
    });

    it('should render an `add` button', () => {
      const actual = wrapper.containsMatchingElement(
        <button>Add</button>
      );
      expect(actual).to.eq(true);
    });

    describe('when clicking on `add` button', () => {
      it('should add another list item', () => {
        const button = wrapper.find('button').last();
        button.simulate('click');
        const listItems = wrapper.find('li');
        expect(listItems.length).to.eq(props.items.length + 1);
      });
    });


    describe('when clicking an item\'s remove button', () => {
      it('should remove the list item', () => {
        expect(props.items.length).to.eq(3);
        const listItem = wrapper.find('li').first();
        const button = listItem.find('button').last();
        button.simulate('click');
        const listItems = wrapper.find('li');
        expect(props.items.length).to.eq(2);
        expect(listItems.length).to.eq(props.items.length);
      });
    });

  });

  describe('when changing an item\'s input value', () => {
    it('should call props.onChange with the value', () => {
      const listItem = wrapper.find('li').first();
      const input = listItem.find('input');

      const mockEv = {
        target: { value: 'new value' }
      };

      input.simulate('change', mockEv);

      expect(props.onChange).to.have.been.calledOnce;

      const expected = props.items;
      expected[0].value = mockEv.target.value;
      expect(props.onChange).to.have.been.calledWith(expected);
    });
  });

});
