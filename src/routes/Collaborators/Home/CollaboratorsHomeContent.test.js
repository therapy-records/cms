import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Link } from 'react-router-dom';
import CollaboratorsHomeContent from './CollaboratorsHomeContent';
import CollaboratorsList from '../../../components/CollaboratorsList';
import { MOCK_GET_COLLABORATORS } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_COLLABORATORS
];

describe('(Component) CollaboratorsHomeContent', () => {
  let wrapper,
      props = {
        listItems: mocks[0].result.data.collaborators,
        executeMutation: sinon.spy(),
        onListOrderChanged: sinon.spy(),
        listOrderHasChanged: false
      };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <CollaboratorsHomeContent {...props} />
      </BrowserRouter>
    );
  });

  it('should render a page title from <MutationContainer /> render prop', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Collaborators 🌈</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render a button to change order from <MutationContainer /> render prop', () => {
    const button = wrapper.find('button').first();
    expect(button.text()).to.eq('Change order');
  });

  it('should render a link to create from <MutationContainer /> render prop', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='collaborators/create'>Create</Link>
    );
    expect(actual).to.equal(true);
  });

  it('should render <CollaboratorsList />', () => {
    const actual = wrapper.containsMatchingElement(
      <CollaboratorsList
        listItems={props.listItems}
        showSortableList={props.showSortableList}
        onOrderChanged={props.onListOrderChanged}
      />
    );
    expect(actual).to.equal(true);
  });

  describe('when `order` button is clicked (toggles `showSortableList` state)', () => {
    let button;

    beforeEach(() => {
      button = wrapper.find('button').first();
      button.simulate('click');
      wrapper.update();
    });

    it('should change the button text', () => {
      expect(button.text()).to.eq('Update order');
    });

    it('should have the button disabled', () => {
      button = wrapper.find('button').first();
      expect(button.props().disabled).to.eq(true);
    });

    it('should change <CollaboratorsList /> showSortableList prop', () => {
      const collaboratorsList = wrapper.find('CollaboratorsList');
      expect(collaboratorsList.prop('showSortableList')).to.eq(true);
    });

    describe('with `showSortableList` state active and props.listOrderHasChanged', () => {
      it('should have the button NOT disabled', () => {
        wrapper = mount(
          <BrowserRouter>
            <CollaboratorsHomeContent
              {...props}
              listOrderHasChanged
            />
          </BrowserRouter>
        );
        button = wrapper.find('button').first();
        expect(button.props().disabled).to.eq(false);
      });
      
      describe('when `order` button is clicked', () => {
        it('should call props.executeMutation', () => {
          wrapper = mount(
            <BrowserRouter>
              <CollaboratorsHomeContent
                {...props}
                listOrderHasChanged
              />
            </BrowserRouter>
          );

          act(() => {
            button = wrapper.find('button').first();
            button.simulate('click');
          });
          wrapper.update();
          button = wrapper.find('button').first();
          button.simulate('click');
          expect(props.executeMutation).to.have.been.calledOnce;
        });
      });

    });

  });

});
