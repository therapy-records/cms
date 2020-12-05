import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectSearch from './SelectSearch';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) SelectSearch', () => {
  let wrapper;
  const props = {
    options: [
      { value: 'testA', label: 'Test A' },
      { value: 'testB', label: 'Test B' },
    ],
  };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<SelectSearch {...props} />);
    });

    it('should render <Select />', () => {
      // note: compiled component from Select library, is called 'StateManager'
      const select = wrapper.find('StateManager');
      expect(select.prop('defaultValue')).to.deep.eq([]);
      expect(select.prop('onChange')).to.be.a('function');
      expect(select.prop('options')).to.eq(props.options);
      expect(select.prop('closeMenuOnSelect')).to.eq(false);
      expect(select.prop('isMulti')).to.eq(true);
      expect(select.prop('name')).to.eq('collaboratorsInImage');
      expect(select.prop('styles')).to.be.an('object');
    });

  });
});
