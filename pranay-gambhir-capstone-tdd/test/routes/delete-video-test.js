const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {buildVideoObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/delete', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {

    it('DELETE button to delete', async () => {

      //SETUP 

      const videoToDelete = buildVideoObject();
      const item = await Video.create(videoToDelete)
      return item
      console.log(item)

      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/delete`)
        .type('form')
        .send();
      const deletedItem = await Video.findOne(videoToDelete);

      // VERIFY
      assert.equal(deletedItem, null);
    });
    it('redirects home', async () => {

      //SETUP 
      const videoToDelete = await seedItemToDatabase();

      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${videoToDelete._id}/delete`)
        .type('form')
        .send();

      // VERIFY
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

  });

});
