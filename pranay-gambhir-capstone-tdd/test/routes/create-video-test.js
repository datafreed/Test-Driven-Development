const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/videos/create');
 
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#url-input'), '');
 
    });
  });

  describe('POST', () => {
    it('creates and saves a new video', async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);
      const createdItem = await Video.findOne(itemToCreate);
      assert.isOk(createdItem, 'Video was not created successfully in the database');
    });
    it('redirects home', async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(itemToCreate);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('displays an error message when supplied an empty title', async () => {
      const invalidItemToCreate = {
        description: 'test',
        url: 'https://www.youtube.com/embed/a3uGWIQDbU8'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Video.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty description', async () => {
      const invalidItemToCreate = {
        title: 'test',
        url: 'https://www.youtube.com/embed/a3uGWIQDbU8'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Video.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty url', async () => {
      const invalidItemToCreate = {
        title: 'test',
        description: 'test'
      };
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Video.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });

});