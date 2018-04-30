const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the create video page', () => {
    describe('posts a new video', () => {
      it('and is rendered', () => {
        const itemToCreate = buildItemObject();
        browser.url('/videos/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#url-input', itemToCreate.url);
        browser.click('#submit-button');
        assert.include(browser.getText('body'), itemToCreate.title);
        assert.include(browser.getAttribute('body iframe', 'src'), itemToCreate.url);
      });
    });
}); 

