const fs = require('fs');
const matter = require('gray-matter');

module.exports = (postPath, url) => {
  const post = matter(fs.readFileSync(postPath, 'utf8'));
  let summary = post.content.trim();

  if (`${summary}\n\n${url}`.length <= 280) {
    return summary;
  }

  summary = summary.substring(0, 275 - url.length);
  summary = summary.substring(0, summary.lastIndexOf(' '));
  summary = summary.replace(/\W+$/, '');
  return summary + '...';
};
