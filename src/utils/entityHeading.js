const entityHeading = entity => {
  const {
    heading,
    title,
    name,
    author,
    venue,
    cloudinaryUrl,
    description
  } = entity;

  if (title && venue) {
    return `${title} - ${venue}`;
  }

  if (venue) {
    return venue;
  }

  const isGalleryEntity = (cloudinaryUrl && description);

  if (isGalleryEntity) {
    return `Gallery - ${description}`;
  }

  return heading || title || name || author;
}

export default entityHeading
