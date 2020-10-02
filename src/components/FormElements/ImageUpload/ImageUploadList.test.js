import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageUploadList from './ImageUploadList';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ImageUploadList', () => {
  let wrapper;
  const props = {
    images: [
      { cloudinaryUrl: 'test.com/image1.jpg', cloudinaryPublicId: 'asdf1' },
      { cloudinaryUrl: 'test.com/image2.jpg', cloudinaryPublicId: 'asdf2' }
    ],
    deleteImage: sinon.spy()
  };

  beforeEach(() => {
    wrapper = shallow(
      <ImageUploadList {...props} />
    );
  });

  it('should render render list of images with remove buttons from props', () => {
    const listItems = wrapper.find('li');
    expect(listItems.length).to.eq(props.images.length);

    const images = wrapper.find('li img');
    expect(images.length).to.eq(props.images.length);

    const buttons = wrapper.find('li button');
    expect(buttons.length).to.eq(props.images.length);
  });

  describe('on click remove button', () => {
    it('should call props.deleteImage', () => {
      const button = wrapper.find('li button').first();
      button.simulate('click');
      expect(props.deleteImage).to.been.calledOnce;
      expect(props.deleteImage).to.been.calledWith(props.images[0].cloudinaryPublicId);
    });
  });

  describe('when an image has no cloudinaryUrl', () => {
    it('should return image without delete button', () => {
      const noCloudinaryUrlImagesProp = [
        { cloudinaryUrl: 'test.com/image1.jpg' },
        {}
      ];

      wrapper.setProps({
        ...props,
        images: noCloudinaryUrlImagesProp
      });

      const images = wrapper.find('li img');
      expect(images.length).to.eq(1);

      const buttons = wrapper.find('li button');
      expect(buttons.length).to.eq(1);
    });
  });

  // describe('when there are no images', () => {
  //   it('should return null', () => {
  //     wrapper.setProps({
  //       images: []
  //     });
  //     expect(wrapper.type()).to.eq(null);
  //   });
  // });
});
