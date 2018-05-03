const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');
const Video = require('../../models/video');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User clicks latest posted video and recieves single video view', () => {

        beforeEach(connectDatabaseAndDropData);

        afterEach(diconnectDatabase);

        it('clicks the title of the created video and is redirected to the respective URL', async () => {

            // SETUP 
            browser.url('/videos/create')
            const videoToCreate = await buildVideoObject();
            const video = await Video.create(videoToCreate)
            return video

            // EXCERCISE 
            browser.setValue('#title-input', videoToCreate.title);
            browser.setValue('#description-input', videoToCreate.description);
            browser.setValue('#url-input', videoToCreate.url);
            browser.click('#submit-button');
            browser.click(`#video-${video._id} a[href="/videos/${video._id}"]`)

            // VERIFY
            assert.include(browser.getText('#video-description'), videoToCreate.description)

        })
        
});
