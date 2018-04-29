const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders item view along with option to delete', async () => {

      //SETUP 
      const itemToCreate = buildItemObject();
      const item = await Item.create(itemToCreate)
      return item
      // EXCERCISE 
      const response = await request(app)
      .get(`/items/${item._id}/delete`);
      // VERIFY
      assert.equal(parseTextFromHTML(response.text, '#item-title'), itemToCreate.title);
      assert.equal(parseTextFromHTML(response.text, '#yes-submit-button'), "Yes")
      assert.equal(parseTextFromHTML(response.text, '#no-button'), "No")

    });

    it('No button', async () => {

      //SETUP 

      // EXCERCISE 
      const response = await request(app)
        .get('/')
      // VERIFY
      assert.equal(response.req.path, '/');
    });
  });

  describe('POST', () => {

    it('YES button to delete', async () => {

      //SETUP 
      const itemToDelete = buildItemObject();
      const item = await Item.create(itemToDelete)
      return item
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${item._id}/delete`)
        .type('form')
        .send();
      const deletedItem = await Item.findOne(itemToDelete);
      // VERIFY
      assert.equal(deletedItem, null);
    });
    it('redirects home', async () => {

      //SETUP 
      const itemToDelete = await seedItemToDatabase();
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${itemToDelete._id}/delete`)
        .type('form')
        .send();
      // VERIFY
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

  });

});
