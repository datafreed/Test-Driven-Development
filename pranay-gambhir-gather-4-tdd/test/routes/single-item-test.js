const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:

  it('single page view url renders the data of the respective item', async () => {

    // SETUP 
    const itemToCreate = await seedItemToDatabase();
    // EXCERCISE 
    const response = await request(app)
    .get(`/items/${itemToCreate._id}`)
    // VERIFY
    assert.include(parseTextFromHTML(response.text, '#item-title'), itemToCreate.title)
    assert.include(parseTextFromHTML(response.text, '#item-description'), itemToCreate.description)
})
  
});
