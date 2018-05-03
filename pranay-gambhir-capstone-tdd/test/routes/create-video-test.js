const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/create', () => {
  const videoToCreate = buildVideoObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {

      // EXCERCISE
      const response = await request(app)
        .get('/videos/create');
      
      //VERIFY
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#url-input'), '');
 
    });
  });

  describe('POST', () => {
    it('creates and saves a new video', async () => {

      //SETUP
      const videoToCreate = buildVideoObject();

      //EXCERCISE
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(videoToCreate);
      const createdItem = await Video.findOne(videoToCreate);

      //VERIFY
      assert.equal(response.status, 302);
      assert.isOk(createdItem, 'Video was not created successfully in the database');
    });
    it('redirects home', async () => {

      //SETUP
      const videoToCreate = buildVideoObject();

      //EXCERCISE
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(videoToCreate);

      //VERIFY
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('displays an error message when supplied an empty title', async () => {

      //SETUP
      const invalidVideoToCreate = {
        description: 'test',
        url: 'https://www.youtube.com/embed/a3uGWIQDbU8'
      };

      //EXCERCISE
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allItems = await Video.find({});

      //VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty description', async () => {

      //SETUP
      const invalidVideoToCreate = {
        title: 'test',
        url: 'https://www.youtube.com/embed/a3uGWIQDbU8'
      };

      //EXCERCISE
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allItems = await Video.find({});

      //VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error message when supplied an empty url', async () => {

      //SETUP
      const invalidVideoToCreate = {
        title: 'test',
        description: 'test'
      };

      //EXCERCISE
      const response = await request(app)
        .post('/videos/create')
        .type('form')
        .send(invalidVideoToCreate);
      const allItems = await Video.find({});

      //VERIFY
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });

});
