// TODO: refactor data models so there is no need for 
// heading || title || name

const entityHeading = entity => {
  const { 
    heading,
    title,
    name
  } = entity;

  return heading || title || name;
}

export default entityHeading
