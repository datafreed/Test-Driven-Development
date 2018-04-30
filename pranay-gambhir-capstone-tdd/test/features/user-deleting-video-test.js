const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const Video = require('../../models/video');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User visits landing page', () => {

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase); 

    describe('User clicks on the title link of the video', () => {

        it('gets redirected to video single view page', async () => {

            // SETUP
            const itemToCreate = await buildItemObject();
            const item = await Video.create(itemToCreate)
            return item
            browser.url('/')
            // EXCERCISE
            browser.click(`video-${item._id} a[href="video-${item._id}"]`)
            // VERIFY
            assert.include(browser.getText('body'), itemToCreate.description);
        })
    })

    describe('user clicks on the delete button', () => {
        it('video gets deleted', async () => {

            // SETUP
            const itemToCreate = buildItemObject();
            const item = await Video.create(itemToCreate);
            return item
            browser.url('/')
            browser.click(`#video-${item._id} a[href="/videos/${item._id}"]`)
            // EXCERCISE
            browser.click(`#delete-${item.id}`)
            // VERIFY
            assert.notInclude(browser.getText('body'), itemToCreate.title);
        })

    })
})