const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/edit', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders filled input fields', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Video.create(itemToUpdate)
      return item
      // EXCERCISE 
      const response = await request(app)
      .get(`/videos/${item._id}/edit`)
      // VERIFY
      assert.notEqual(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.notEqual(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.notEqual(parseTextFromHTML(response.text, 'input#url-input'), ''); 
    });
  });

  describe('POST', () => {

    it('updates and saves the video', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Video.create({ 
        title: "title", 
        description: "description", 
        url: "https://www.youtube.com/embed/j_ki9tw9rUQ"
      });
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/edit`)
        .type('form')
        .send(itemToUpdate);
      const updatedItem = await Video.findById(item._id);
      // VERIFY
      assert.equal(updatedItem.title, itemToUpdate.title);
      assert.equal(updatedItem.description, itemToUpdate.description);
      assert.equal(updatedItem.url, itemToUpdate.url);
    });
    it('redirects home', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Video.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/edit`)
        .type('form')
        .send(itemToUpdate);
      // VERIFY
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('displays an error message when supplied an empty title', async () => {

      //SETUP 
      const invalid = {
        title: null, 
        description: 'test',
        url: "https://www.youtube.com/embed/j_ki9tw9rUQ"
      };
      const itemToUpdate = buildItemObject();
      const item = await Video.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/edit`)
        .type('form')
        .send(invalid);
      const allItems = await Video.find({});
      // VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty description', async () => {

      //SETUP 
      const invalid = {
        title: 'test',
        description: null,
        url: "https://www.youtube.com/embed/j_ki9tw9rUQ"
      };
      const itemToUpdate = buildItemObject();
      const item = await Video.create(itemToUpdate)
      return item;
      // EXCERCISE
      const response = await request(app)
        .post(`/videos/${item._id}/edit`)
        .type('form')
        .send(invalid);
      const allItems = await Video.find({});
      // VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty url', async () => {      

      //SETUP 
      const invalid = {
        title: 'test',
        description: 'test',
        url: null
      };
      const itemToUpdate = buildItemObject();
      const item = await Video.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/videos/${item._id}/edit`)
        .type('form')
        .send(invalid);
      const allItems = await Video.find({});
      // VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  }); 

}); 
