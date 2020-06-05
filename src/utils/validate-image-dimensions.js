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
  const messages = [];

  if (width < minDimensions.width) {
    messages.push(
      `Image width is too small (${width}px). Minimum width: ${minDimensions.width}px`
    );
  }

  if (height < minDimensions.height) {
    messages.push(
      `Image height is too small (${height}px). Minimum height: ${minDimensions.height}px`
    );
  }

  return messages;
};

const validateImageDimensions = (minDimensions, image) => {
  const valid = isValid(minDimensions, image);

  if (valid) {
    return true;
  }
  return validationMessage(minDimensions, image);
};

export default validateImageDimensions;
