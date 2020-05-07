const entityHeading = entity => {
  const {
    heading,
    title,
    name,
    author,
    venue
  } = entity;

  if (title && venue) {
    return `${title} - ${venue}`;
  }

  if (venue) {
    return venue;
  }

  return heading || title || name || author;
}

export default entityHeading
