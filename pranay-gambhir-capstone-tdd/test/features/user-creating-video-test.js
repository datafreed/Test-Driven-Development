const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create video page', () => {
    describe('posts a new video', () => {
      it('and is rendered', () => {

        //SETUP
        const videoToCreate = buildVideoObject();
        browser.url('/videos/create');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.setValue('#url-input', videoToCreate.url);
        browser.click('#submit-button');

        //VERIFY
        assert.include(browser.getText('body'), videoToCreate.title);
        assert.include(browser.getAttribute('body iframe', 'src'), videoToCreate.url);
      });
    });
}); 

