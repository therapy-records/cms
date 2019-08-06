import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DropzoneImageUpload from './DropzoneImageUpload';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DropzoneImageUpload', () => {
  let wrapper,
    props = {
      title: 'hello test',
      minImageDimensions: {
        width: 400,
        height: 400
      }
    };

  beforeEach(() => {
    wrapper = shallow(
      <DropzoneImageUpload {...props} />
    );
  });

  describe('methods', () => {

    describe('componentDidMount', () => {
      describe('when there is props.existingimages', () => {
        it('should set state', () => {
          const mockExistingImages = ['http://test.com/image.jpg'];
          wrapper.setProps({
            existingImages: mockExistingImages
          });
          wrapper.instance().componentDidMount();
          expect(wrapper.state().images).to.deep.eq(mockExistingImages);
        });
      });
    });

    describe('componentWillReceiveProps', () => {
      describe('when there is props.existingImages', () => {
        it('should set state', () => {
          const mockExistingImages = ['http://test.com/image.jpg'];
          wrapper.setProps({
            existingImages: mockExistingImages
          });
          expect(wrapper.state().images).to.deep.eq(mockExistingImages);
        });
      });
    });

    describe('handleImageResponseUrl', () => {
      it('should replace a given URL with cloudinary upload params', () => {
        const mockUrl = 'upload';
        const result = wrapper.instance().handleImageResponseUrl(mockUrl);
        expect(result).to.eq(mockUrl.replace(/upload/, 'upload/c_limit,q_100,w_650'))
      });
    });

    describe('validMinimumImageDimensions', () => {
      let mockMinImageDimensions
      beforeEach(() => {
        mockMinImageDimensions = { width: 3, height: 3 };
        wrapper.setProps({
          minImageDimensions: mockMinImageDimensions
        });
      });

      describe('when provided width and height is greater than or equal to the minimum dimensions', () => {
        it('should return true', () => {
          let result = wrapper.instance().validMinimumImageDimensions({ width: 3, height: 3 });
          expect(result).to.eq(true);
          result = wrapper.instance().validMinimumImageDimensions({ width: 4, height: 4 });
          expect(result).to.eq(true);          
        });
      });

      describe('when provided width and height is less than the minimum dimensions', () => {
        it('should return false', () => {
          let result = wrapper.instance().validMinimumImageDimensions({ width: 2, height: 2 });
          expect(result).to.eq(false);
        });
      });
    });

    describe('handleOnDrop', () => {
      it('should call uploadSingleImage for each file item', () => {
        const mockFiles = [
          'temp/testing1.jpg',
          'temp/testing2.jpg',
          'temp/testing3.jpg'
        ];
        const uploadSingleImageSpy = sinon.spy();
        wrapper.instance().uploadSingleImage = uploadSingleImageSpy;
        wrapper.instance().handleOnDrop(mockFiles);
        expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[0]);
        expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[1]);
        expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[2]);
      });
    });

    describe('removeSingleImage', () => {
      const mockInitImageState = [
        'temp/testing1.jpg',
        'temp/testing2.jpg',
        'temp/testing3.jpg'
      ];

      it('should remove a given image url from state and call props.input.onChange', () => {
        const imageToRemove = mockInitImageState[1];
        const onChangeSpy = sinon.spy();

        wrapper.setProps({
          input: {
            onChange: onChangeSpy
          }
        });
        wrapper.setState({ images: mockInitImageState });
        wrapper.instance().removeSingleImage(imageToRemove);
        expect(wrapper.state().images).to.deep.eq([
          mockInitImageState[0],
          mockInitImageState[2]
        ]);
        expect(onChangeSpy).to.have.been.calledWith('');
      });

      describe('with no props.input.onChange', () => {
        it('should remove a given image url from state and call props.onRemove', () => {
          const imageToRemove = mockInitImageState[1];
          const onRemoveSpy = sinon.spy();

          wrapper.setProps({
            onRemove: onRemoveSpy
          });
          wrapper.setState({ images: mockInitImageState });
          wrapper.instance().removeSingleImage(imageToRemove);
          const expectedState = [
            mockInitImageState[0],
            mockInitImageState[2]
          ];
          expect(wrapper.state().images).to.deep.eq(expectedState);
          expect(onRemoveSpy).to.have.been.calledWith(1);
        });

      });
    });

  });

  describe('rendering', () => {
    it('should render a heading/title with props.minImageDimensions', () => {
      const actual = wrapper.containsMatchingElement(
        <h5>{props.title}&nbsp;
          <span><small>(must be at least {props.minImageDimensions.width}px by {props.minImageDimensions.height}px)</small></span>
        </h5>
      );
      expect(actual).to.equal(true);
    });

    describe('when state.isLoading', () => {
      beforeEach(() => {
        wrapper.setState({
          isLoading: true
        });
      });

      it('should add an `active` className to Dropzone component', () => {
        const activeClassName = wrapper.find('.dropzone.dropzone-active');
        expect(activeClassName.length).to.eq(1);
      });

      it('should add a `loading/active` className to Dropzone cta element', () => {
        const activeClassName = wrapper.find('.dropzone-loading.dropzone-loading-active');
        expect(activeClassName.length).to.eq(1);
      });
    });

    describe('images', () => {
      const mockImages = [
        'http://test.com/1.jpg',
        'http://test.com/2.jpg',
        'http://test.com/3.jpg'
      ];

      beforeEach(() => {
        wrapper.setState({
          images: mockImages
        });
      });

      it('should render a list of images', () => {
        const listItem = wrapper.find('li');
        expect(listItem.length).to.eq(3);

        const firstListItem = listItem.first();
        const actual = firstListItem.containsMatchingElement(
          <img src={mockImages[0]} alt={`image  ${mockImages[0] + 1}`} />
        );
        expect(actual).to.eq(true);
      });

      describe('remove buton', () => {
        let listItem;
        let button;

        beforeEach(() => {
          listItem = wrapper.find('li').first();
          button = listItem.find('button');
        });

        it('should render in list item', () => {
          expect(button.prop('type')).to.eq('button');
          expect(button.prop('onClick')).to.be.a('function');
          expect(button.text()).to.eq('remove');
        });

        describe('onClick', () => {
          it('should call removeSingleImage function', () => {
            const removeSingleImageSpy = sinon.spy();
            wrapper.instance().removeSingleImage = removeSingleImageSpy;
            button.simulate('click');
            expect(removeSingleImageSpy).to.have.been.calledWith(mockImages[0])
          });
        });
      });

    });

    describe('with state.invalidDimensions', () => {
      it('should render a list of messages', () => {
        wrapper.setState({
          invalidDimensions: [
            'error message A',
            'error message B'
          ]
        });
        const actual = wrapper.containsAllMatchingElements([
          <li key={0} className='form-error'>error message A</li>,
          <li key={1}>error message B</li>
        ]);
        expect(actual).to.eq(true);
      });
    });
  });

});
