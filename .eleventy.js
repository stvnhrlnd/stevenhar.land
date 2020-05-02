const fs = require('fs');

const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlightingPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');

const datetimeFilter = require('./src/filters/datetime-filter');
const limitFilter = require('./src/filters/limit-filter');
const metatitleFilter = require('./src/filters/metatitle-filter');
const previewFilter = require('./src/filters/preview-filter');

const htmlMinifierTransform = require('./src/transforms/html-minifier-transform');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlightingPlugin);

  eleventyConfig.addFilter('datetime', datetimeFilter);
  eleventyConfig.addFilter('limit', limitFilter);
  eleventyConfig.addFilter('metatitle', metatitleFilter);
  eleventyConfig.addFilter('preview', previewFilter);

  eleventyConfig.addTransform('html-minifier', htmlMinifierTransform);

  eleventyConfig.addPassthroughCopy('src/site/fonts');
  eleventyConfig.addPassthroughCopy('src/site/images');
  eleventyConfig.addPassthroughCopy('src/site/robots.txt');

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, bs) => {
        const content = fs.readFileSync('_site/404.html');
        bs.addMiddleware('*', (req, res) => {
          res.write(content);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: 'src/site',
    }
  };
};
