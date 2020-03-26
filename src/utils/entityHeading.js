// TODO: refactor data models so there is no need for
// heading || title || name

const entityHeading = entity => {
  const {
    heading,
    title,
    name,
    author
  } = entity;

  return heading || title || name || author;
}

export default entityHeading
