const fs = require('fs');
const fse = require('fs-extra');
const {DateTime} = require('luxon');
const matter = require('gray-matter');

const siteDir = 'src/site';
const postsDir = `${siteDir}/posts`;
const imagesDir = `${siteDir}/images`;

const local = DateTime.local();
const utc = local.toUTC();
const timestamp = Math.floor(utc.toSeconds());
const frontMatter = {
  date: utc.toISO(),
  title: local.toFormat('cccc, d LLLL yyyy, HH:mm'),
};

const draft = matter(fs.readFileSync(`${postsDir}/draft.md`, 'utf8'));
Object.assign(frontMatter, draft.data);
draft.data = frontMatter;

if (fs.existsSync(`${imagesDir}/draft`) && fs.readdirSync(`${imagesDir}/draft`).length > 0) {
  fse.copySync(`${imagesDir}/draft`, `${imagesDir}/${timestamp}`);
  draft.content = draft.content.replace('/images/draft/', `/images/${timestamp}/`);

  if (draft.data.socialImage) {
    draft.data.socialImage = draft.data.socialImage.replace(
      '/images/draft/',
      `/images/${timestamp}/`
    );
  }
}

const post = matter.stringify(draft);
fs.writeFileSync(`${postsDir}/${timestamp}.md`, post);
