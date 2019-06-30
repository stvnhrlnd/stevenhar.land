const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const minify = require("html-minifier").minify;
const { DateTime } = require("luxon");
const fs = require("fs");

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addTransform("minifyhtml", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = minify(content, {
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("formatdate", (dateObj, format = "d LLLL yyyy") => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat(format);
  });

  eleventyConfig.addFilter("metatitle", (pageTitle, siteTitle) => {
    if (!pageTitle || pageTitle == siteTitle) {
      return siteTitle;
    }

    if (pageTitle.length + 3 + siteTitle.length < 60) {
      return `${pageTitle} | ${siteTitle}`;
    }

    return pageTitle;
  });

  eleventyConfig.addPassthroughCopy("favicon");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, bs) => {
        const content = fs.readFileSync("_site/404.html");
        bs.addMiddleware("*", (req, res) => {
          res.write(content);
          res.end();
        });
      }
    }
  });

  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
    dataTemplateEngine: false,
    passthroughFileCopy: true,
    dir: {
      input: "src/site"
    }
  };
};
