import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import ConnectedStickyError, { StickyError } from './StickyError';
import Sticky from '../Sticky/Sticky';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) StickyError', () => {
  let wrapper,
    props = {
      message: 'Something has gone wrong'
    };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<StickyError {...props} />);
    });

    it('should render <Sticky /> with props.message', () => {
      const actual = wrapper.containsMatchingElement(
        <Sticky>
          <p>{props.message}</p>
        </Sticky>
      );
      expect(actual).to.eq(true);
    });

    describe('when there is no props.message', () => {
      it('should not render', () => {
        wrapper.setProps({message: ''});
        expect(wrapper.type()).to.eq(null);
      });
    });
  });

  describe('ConnectedStickyError', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      errorAlert: {
        message: 'oh no'
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedStickyError
          store={store}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.props();
      expect(renderedProps.message).to.eq(mockStoreState.errorAlert.message);
    });
  });
});
