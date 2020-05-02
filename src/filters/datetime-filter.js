const {DateTime} = require('luxon');

module.exports = (dateObj, format = 'd LLLL yyyy, HH:mm (ZZZZ)') => {
  return DateTime.fromJSDate(dateObj, {
    zone: 'utc',
  }).toFormat(format);
};
