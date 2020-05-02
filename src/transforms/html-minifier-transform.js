const minify = require('html-minifier').minify;

module.exports = (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    let minified = minify(content, {
      collapseWhitespace: true,
    });
    return minified;
  }

  return content;
};
