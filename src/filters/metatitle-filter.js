module.exports = (pageTitle, siteTitle) => {
  if (!pageTitle || pageTitle == siteTitle) {
    return siteTitle;
  }

  if (pageTitle.length + 3 + siteTitle.length < 60) {
    return `${pageTitle} | ${siteTitle}`;
  }

  return pageTitle;
};
