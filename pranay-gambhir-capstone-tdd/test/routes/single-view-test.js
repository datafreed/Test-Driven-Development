const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:

  it('single page view url renders the data of the respective video', async () => {

    // SETUP 
    const itemToCreate = await seedItemToDatabase();
    // EXCERCISE 
    const response = await request(app)
    .get(`/videos/${itemToCreate._id}`)
    // VERIFY
    assert.include(parseTextFromHTML(response.text, '#video-title'), itemToCreate.title)
    assert.include(parseTextFromHTML(response.text, '#video-description'), itemToCreate.description)
})
  
});