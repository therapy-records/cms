const entityHeading = entity => {
  const {
    heading,
    title,
    name,
    author,
    venue,
    image,
    description
  } = entity;

  if (title && venue) {
    return `${title} - ${venue}`;
  }

  if (venue) {
    return venue;
  }

  const isGalleryEntity = (image && image.cloudinaryUrl && description);

  if (isGalleryEntity) {
    return `Gallery - ${description}`;
  }

  return heading || title || name || author;
}

export default entityHeading
