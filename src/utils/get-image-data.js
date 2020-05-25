export const imageDataObj = image => {
  const { width, height } = image;
  return {
    width,
    height,
    base64String: image.src
  };
};

export const getImageData = file => {
  return new Promise(resolve => {
    if (window.FileReader) {
      const reader = new FileReader();

      if ((file && file.type && file.type.match('image.*'))) {
        reader.readAsDataURL(file);
      }

      reader.onload = (e) => {
        const image = new Image();

        image.src = e.target.result;

        image.onload = () => resolve(image);
      };
    } else {
      // only required for unit tests...
      return resolve({
        ...file,
        src: file.path
      });
    }
  });
};

export const getImageDimensions = image =>
  getImageData(image).then((data) => imageDataObj(data));

export const getImageBase64String = image =>
  getImageData(image).then((data) => data.src);
