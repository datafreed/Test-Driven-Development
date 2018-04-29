const {assert} = require('chai');
const {buildItemObject, parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const Item = require('../../models/item');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User visits root', () => {

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase); 

    describe('user clicks on the delete button of an item', () => {

        it('gets redirected to delete url', async () => {

            // SETUP

            browser.url('/')
            const itemToCreate = await buildItemObject();
            const item = await Item.create(itemToCreate)
            return item

            // EXCERCISE

            browser.click(`#delete-${item._id}`)

            // VERIFY
            assert.include(browser.getText('body'), itemToCreate.description);
        })
    })

    describe('user makes choice between yes or no', () => {
        it('YES - deletes the item and redirects to root page', async () => {

            const itemToCreate = buildItemObject();
            const item = await Item.create(itemToCreate);
            return item
            browser.url(`/items/${item._id}/delete`)

            browser.click(`#yes-button`)
            const findItem = await Item.findById(item._id);
            assert.equal(findItem, null)
        })

        it('NO - redirects to the root page without deleting the item', async () => {

            const itemToCreate = await buildItemObject();
            const item = await Item.create(itemToCreate)
            return item
            browser.url(`/items/${item._id}/delete`)

            browser.click('#no-button')

            assert.NotInclude(browser.getText('body'), itemToCreate.description);
        })
    })
})