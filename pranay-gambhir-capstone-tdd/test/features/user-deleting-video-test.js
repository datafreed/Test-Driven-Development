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
            browser.click(`video-${video._id} a[href="video-${video._id}"]`)

            // VERIFY
            assert.include(browser.getText('body'), videoToCreate.description);
        })
    })

    describe('user clicks on the delete button', () => {
        it('video gets deleted', async () => {

            // SETUP
            const videoToCreate = buildVideoObject();
            const video = await Video.create(videoToCreate);
            return video
            browser.url('/')
            browser.click(`#video-${video._id} a[href="/videos/${video._id}"]`)

            // EXCERCISE
            browser.click(`#delete-${video.id}`)

            // VERIFY
            assert.notInclude(browser.getText('body'), videoToCreate.title);
        })

    })
})
