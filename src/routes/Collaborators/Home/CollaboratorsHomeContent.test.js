import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import CollaboratorsHomeContent from './CollaboratorsHomeContent';
import CollaboratorsList from '../../../components/CollaboratorsList';
import { MOCK_GET_COLLABORATORS } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
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

  describe('<PageHeader />', () => {
    let pageHeader;

    beforeEach(() => {
      pageHeader = wrapper.find('PageHeader');
    });

    it('should render with correct props', () => {
      expect(pageHeader.length).to.eq(1);
      expect(pageHeader.prop('heading')).to.eq('Collaborators 🌈');
      expect(pageHeader.prop('entityCollection')).to.eq('collaborators');
      expect(pageHeader.prop('renderCreateButton')).to.eq(true);
      expect(pageHeader.prop('bespokeButton')).to.be.an('object');
    });

    it('should render a bespokeButton prop with correct copy', () => {
      const button = wrapper.find('button').first();
      expect(button.text()).to.eq('Change order');
    });

    describe('when `change order` button is clicked (toggles `showSortableList` state)', () => {
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

      it('should change <PageHeader /> renderCreateButton prop to false', () => {
        pageHeader = wrapper.find('PageHeader');
        expect(pageHeader.prop('renderCreateButton')).to.eq(false);
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
      });
    });

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

});
