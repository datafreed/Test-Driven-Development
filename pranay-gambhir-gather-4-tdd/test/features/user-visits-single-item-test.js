const {assert} = require('chai');
const {buildItemObject, parseTextFromHTML} = require('../test-utils');
const Item = require('../../models/item');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User clicks latest posted item and recieves single item view', () => {

        beforeEach(connectDatabaseAndDropData);

        afterEach(diconnectDatabase);

        it('clicks the created item on the root page and is redirected to the respective URL', async () => {

            // SETUP 

            browser.url('/item/create')
            const itemToCreate = await buildItemObject();
            const item = await Item.create(itemToCreate)
            return item

            // EXCERCISE 

            browser.setValue('#title-input', itemToCreate.title);
            browser.setValue('#description-input', itemToCreate.description);
            browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
            browser.click('#submit-button');
            browser.click(`#item-${item._id} a[href="/items/${item._id}"]`)

            // VERIFY
            assert.include(browser.getText('#item-description'), itemToCreate.description)
            //assert.equal(response.req.path, `/items/${itemToCreate._id}`); parseTextFromHTML(getResponse.text, '#item-description')

        })
        
});

