const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/delete', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {

    it('DELETE button to delete', async () => {

      //SETUP 
      const itemToDelete = buildItemObject();
      const item = await Video.create(itemToDelete)
      return item
      console.log(item)
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/delete`)
        .type('form')
        .send();
      const deletedItem = await Video.findOne(itemToDelete);
      // VERIFY
      assert.equal(deletedItem, null);
    });
    it('redirects home', async () => {

      //SETUP 
      const itemToDelete = await seedItemToDatabase();
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${itemToDelete._id}/delete`)
        .type('form')
        .send();
      // VERIFY
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

  });

});