const {jsdom} = require('jsdom');

const Video = require('../models/video');

// Create and return a sample Video object
const buildItemObject = (options = {}) => {
  const title = options.title || 'Warriyo';
  const url = options.url || 'https://www.youtube.com/watch?v=yJg-Y5byMMw&list=RDyJg-Y5byMMw&start_radio=1';
  const description = options.description || 'NCS';
  return {title, url, description};
};

// Add a sample Video object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const video = await Video.create(buildItemObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildItemObject,
  seedItemToDatabase,
  parseTextFromHTML,
};
