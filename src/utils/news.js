export const EMPTY_ARTICLE_SECTION_OBJ = {
  images: [],
  copy: ''
};

export const NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 350,
  height: 350
};

// TODO: refactor so it's not news/'article.sections' specific
export const getFirstImageInArticle = (article) => {
  const { sections } = article;
  const sectionsWithImages = [];

  sections && sections.length && sections.forEach((section) => {
    return section.images.forEach(imageObj => {
      if (imageObj.cloudinaryUrl && imageObj.cloudinaryUrl.length) {
        sectionsWithImages.push(imageObj.cloudinaryUrl);
        return imageObj.cloudinaryUrl;
      }
      return '';
    });
  });

  if (sectionsWithImages.length) {
    return sectionsWithImages[0];
  }
  return 'https://via.placeholder.com/150x137/EEE/999?text=No+image&color=EEEEEE';
};

export const removeEmptyImageUrls = sections => {
  if (sections && sections.length) {
    return sections.map(section => {
      const sectionImages = [];

      section.images.map(imageObj => {
        if (imageObj.cloudinaryUrl.length > 0) {
          sectionImages.push(imageObj);
        }
      });

      section.images = sectionImages;
      return section;
    });
  }
}
