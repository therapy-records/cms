export const isValid = (minDimensions, image) => {
  const { width, height } = image;

  if (width >= minDimensions.width &&
    height >= minDimensions.height) {
    return true;
  }
  return false;
};

export const validationMessage = (minDimensions, image) => {
  const { width, height } = image;
  let message = null;

  if (width < minDimensions.width) {
    message = `Width is too small (${width}px).`;
  }

  if (height < minDimensions.height) {
    if (message) {
      message = message + ` Height is too small (${height}px).`;
    } else {
      message = `Height is too small (${height}px).`;
    }
  }

  return message;
};

const validateImageDimensions = (minDimensions, image) => {
  const valid = isValid(minDimensions, image);

  if (valid) {
    return {
      isValid: true
    };
  }
  return {
    isValid: false,
    message: validationMessage(minDimensions, image)
  };
};

export default validateImageDimensions;
