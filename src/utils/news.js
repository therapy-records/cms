export const getArticlesFirstImageUrl = (article, placeholderFallback = false) => {
  const hasImages = article.sections &&
    article.sections.length &&
    article.sections[0].images &&
    article.sections[0].images.length &&
    article.sections[0].images[0].url;

  if (hasImages) {
    const firstImage = article.sections[0].images[0].url;
    return firstImage;
  }
  if (placeholderFallback) {
    return 'http://via.placeholder.com/100x137/C8C8C8/777?text=No+image&color=EEEEEE';
  }
  return null;
};
