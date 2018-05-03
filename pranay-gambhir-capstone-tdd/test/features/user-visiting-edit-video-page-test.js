const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');
const Video = require('../../models/video');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User visits landing page', () => {

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase); 

    describe('User clicks on the title link of the video', () => {

        it('gets redirected to video single view page', async () => {

            // SETUP
            const videoToCreate = await buildVideoObject();
            const video = await Video.create(videoToCreate)
            return video
            browser.url('/')

            // EXCERCISE
            browser.click(`#video-${video._id} a[href="/videos/${video._id}"]`)

            // VERIFY
            assert.include(browser.getText('body'), videoToCreate.description);
        })
    })

    describe('user clicks on the edit button', () => {
        it('gets redirected to edit video page', async () => {

            // SETUP
            const videoToCreate = buildVideoObject();
            const video = await Video.create(videoToCreate);
            return video
            browser.url('/')
            browser.click(`#video-${video._id} a[href="/videos/${video._id}"]`)

            // EXCERCISE
            browser.click(`#edit-${video.id}`)

            // VERIFY
            assert.include(browser.getText('#title-input'), videoToCreate.title);
        })
    })

    describe('user edits the video and submits', () => {
        it('renders the video on the landing page', async () => {

            // SETUP
            const newTitle = "A new Title"
            const videoToCreate = buildVideoObject();
            const video = await Video.create(videoToCreate);
            return video
            browser.url('/')
            browser.click(`#video-${video._id} a[href="/videos/${video._id}"]`)
            browser.click(`#edit-${item.id}`)

            // EXCERCISE
            browser.setValue('#title-input', newTitle);
            browser.click("#submit-button")

            // VERIFY
            assert.include(browser.getText('body'), newTitle);
        })
    })
})
