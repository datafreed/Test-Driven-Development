const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/:id/update', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders filled input fields', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Item.create(itemToUpdate)
      return item
      // EXCERCISE 
      const response = await request(app)
      .get(`/items/${item._id}/update`)
      // VERIFY
      assert.notEqual(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.notEqual(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.notEqual(parseTextFromHTML(response.text, 'input#imageUrl-input'), ''); 
    });
  });

  describe('POST', () => {

    it('updates and saves the item', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Item.create({ 
        title: "title", 
        description: "description", 
        imageUrl: "https://community.moosocial.com/uploads/topics/thumbnail/1151/850_ef73970f6959b19184c4f7655e2bdcdc.png" 
      });
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(itemToUpdate);
      const updatedItem = await Item.findById(item._id);
      // VERIFY
      assert.equal(updatedItem.title, itemToUpdate.title);
      assert.equal(updatedItem.description, itemToUpdate.description);
      assert.equal(updatedItem.imageUrl, itemToUpdate.imageUrl);
    });
    it('redirects home', async () => {

      //SETUP 
      const itemToUpdate = buildItemObject();
      const item = await Item.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${item._id}/update`)
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
        imageUrl: 'https://www.placebear.com/200/300'
      };
      const itemToUpdate = buildItemObject();
      const item = await Item.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(invalid);
      const allItems = await Item.find({});
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
        imageUrl: 'https://www.placebear.com/200/300'
      };
      const itemToUpdate = buildItemObject();
      const item = await Item.create(itemToUpdate)
      return item;
      // EXCERCISE
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(invalid);
      const allItems = await Item.find({});
      // VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty imageUrl', async () => {      

      //SETUP 
      const invalid = {
        title: 'test',
        description: 'test',
        imageUrl: null
      };
      const itemToUpdate = buildItemObject();
      const item = await Item.create(itemToUpdate)
      return item;
      // EXCERCISE 
      const response = await request(app)
        .post(`/items/${item._id}/update`)
        .type('form')
        .send(invalid);
      const allItems = await Item.find({});
      // VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  }); 

}); 
