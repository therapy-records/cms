import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import ImageUploadContainer from './ImageUploadContainer';
import ImageUpload from './ImageUpload';
import { CLOUDINARY_SIGNATURE } from '../../../queries';
import LoadingSpinner from '../../LoadingSpinner';
import { MOCK_CLOUDINARY_SIGNATURE } from '../../../mocks/cloudinary-signature.mock';
import GalleryImageUploadList from '../../GalleryImageUploadList';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_CLOUDINARY_SIGNATURE
];

describe('(Component) ImageUploadContainer', () => {
  let wrapper;
  const props = {
    existingImages: [
      { cloudinaryUrl: '1.jpg' },
      { cloudinaryUrl: '2.jpg' }
    ],
    minImageDimensions: {
      width: 100,
      height: 100
    },
    ctaCopy: 'test',
    multiple: true,
    handleOnUpload: sinon.spy(),
    handleOnRemove: sinon.spy(),
    imageUploadListItemComponent: GalleryImageUploadList
  };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  describe('when there are no errors', () => {
    it('should render <ImageUpload /> with query data/props', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUploadContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <ImageUpload
            cloudinarySignature={MOCK_CLOUDINARY_SIGNATURE.result.data.cloudinarySignature.signature}
            cloudinaryKey={MOCK_CLOUDINARY_SIGNATURE.result.data.cloudinarySignature.key}
            cloudinaryTimestamp={MOCK_CLOUDINARY_SIGNATURE.result.data.cloudinarySignature.timestamp}
            existingImages={props.existingImages}
            minImageDimensions={props.minImageDimensions}
            ctaCopy={props.ctaCopy}
            multiple={props.multiple}
            handleOnUpload={props.handleOnUpload}
            handleOnRemove={props.handleOnRemove}
            imageUploadListItemComponent={props.imageUploadListItemComponent}
          />
        );
        expect(actual).to.eq(true);
      });
    });
  });

  describe('when graphQL query is loading', () => {
    it('should return loading', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUploadContainer />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        const actual = wrapper.containsMatchingElement(
          <LoadingSpinner
            active
          />
        );
        expect(actual).to.eq(true);
      });
    });
  });

  describe('when the graphQL query errors', () => {
    it('should return <StickyError />', async() => {
      mocks = [
        {
          request: {
            query: CLOUDINARY_SIGNATURE
          },
          error: new Error('Some query error')
        }
      ];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUploadContainer />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const stickyError = wrapper.find('StickyError');
        expect(stickyError.length).to.eq(1);
        expect(stickyError.prop('message')).to.eq('Sorry, something has gone wrong.');
      });
    });
  });

  describe('when there is no graphQL data', () => {
    it('should return null', async() => {
      mocks = [
        {
          request: {
            query: CLOUDINARY_SIGNATURE
          },
          result: {
          }
        }
      ];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUploadContainer />
          </MockedProvider>
        </BrowserRouter>
      );
      await actions(wrapper, () => {
        wrapper.update();
        const stickyError = wrapper.find('StickyError');
        expect(stickyError.length).to.eq(1);
        expect(stickyError.prop('message')).to.eq('Sorry, something has gone wrong.');
      });
    });
  });
});
