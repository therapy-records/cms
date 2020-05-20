export const imageDataObj = image => {
  const { width, height } = image;
  return {
    width,
    height,
    base64String: image.src
  };
};

const getImageDimensions = image => {
  return new Promise(resolve => {
    const reader = new FileReader();

    // read the contents of Image File.
    reader.readAsDataURL(image);

    reader.onload = (e) => {
      // initiate the JavaScript Image object.
      const image = new Image();

      // st the Base64 string return from FileReader as image source
      image.src = e.target.result;

      image.onload = () => resolve(imageDataObj(image));
    };
  });
};

export default getImageDimensions;
