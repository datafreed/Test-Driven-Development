const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findVideoElementBySource = (htmlAsString, src) => {
  const video = jsdom(htmlAsString).querySelector(`iframe[src="${src}"]`);
  if (video !== null) {
    return video;
  } else {
    throw new Error(`Video with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders an video with a title and image', async () => {
      const video = await seedItemToDatabase();

      const response = await request(app)
      .get(`/`);

      assert.include(parseTextFromHTML(response.text, '.video-title'), video.title);
      const videoElement = findVideoElementBySource(response.text, video.url);
      assert.equal(videoElement.src, video.url);
    });

    it('renders all videos from the database', async () => {
      const firstItem = await seedItemToDatabase({title: 'Video1'});
      const secondItem = await seedItemToDatabase({title: 'Video2'});

      const response = await request(app)
        .get(`/`);

      assert.include(parseTextFromHTML(response.text, `#video-${firstItem._id} .video-title`), firstItem.title);
      assert.include(parseTextFromHTML(response.text, `#video-${secondItem._id} .video-title`), secondItem.title);
    });
  });
});
