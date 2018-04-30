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
            browser.click(`#video-${item._id} a[href="/videos/${item._id}"]`)
            // VERIFY
            assert.include(browser.getText('body'), itemToCreate.description);
        })
    })

    describe('user clicks on the edit button', () => {
        it('gets redirected to edit video page', async () => {

            // SETUP
            const itemToCreate = buildItemObject();
            const item = await Video.create(itemToCreate);
            return item
            browser.url('/')
            browser.click(`#video-${item._id} a[href="/videos/${item._id}"]`)
            // EXCERCISE
            browser.click(`#edit-${item.id}`)
            // VERIFY
            assert.include(browser.getText('#title-input'), itemToCreate.title);
        })
    })

    describe('user edits the video and submits', () => {
        it('renders the video on the landing page', async () => {

            // SETUP
            const newTitle = "A new Title"
            const itemToCreate = buildItemObject();
            const item = await Video.create(itemToCreate);
            return item
            browser.url('/')
            browser.click(`#video-${item._id} a[href="/videos/${item._id}"]`)
            browser.click(`#edit-${item.id}`)
            // EXCERCISE
            browser.setValue('#title-input', newTitle);
            browser.click("#submit-button")
            // VERIFY
            assert.include(browser.getText('body'), newTitle);
        })
    })
})