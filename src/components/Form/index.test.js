import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import Form from './index';
import TextInput from '../FormElements/TextInput';
import { CREATE_COLLABORATOR } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: CREATE_COLLABORATOR,
      variables: {
        name: 'test',
        avatarUrl: 'test.com'
      }
    },
    result: {
      data: {
        _id: 'abc1',
        name: 'test',
        avatarUrl: 'test.com'
      }
    }
  }
];

describe('(Component) Form', () => {
  let wrapper;
  const props = {
    children: (
      <TextInput
        type='text'
        placeholder='test'
        label='Test'
        name='name'
        required
      />
    ),
    mutation: CREATE_COLLABORATOR
  }

  // const actions = async (wrapper, _actions) => {
  //   await act(async () => {
  //     await (new Promise(resolve => setTimeout(resolve, 0)));
  //     _actions();
  //     wrapper.update();
  //   });
  // };

  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Form {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a form with children', () => {
      const actual = wrapper.containsMatchingElement(
        props.children
      );
      expect(actual).to.equal(true);
    });

    describe('submit button', () => {
      it('should render', () => {
        const actual = wrapper.containsMatchingElement(
          <button type='submit'>Add</button>
        );
        expect(actual).to.equal(true);
      });

      describe('when it\'s an `edit` form', () => {
        beforeEach(() => {
          wrapper = mount(
            <BrowserRouter>
              <MockedProvider mocks={mocks} addTypename={false}>
                <Form {...props} isEditForm />
              </MockedProvider>
            </BrowserRouter>
          );
        });

        it('should render submit button copy', () => {
          const actual = wrapper.containsMatchingElement(
            <button type='submit'>Update</button>
          );
          expect(actual).to.equal(true);
        });

      });
    });

  });

});
