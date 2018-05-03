const {assert} = require('chai');

describe('User visits landing page', () => {
  describe('without existing videos', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('can navigate', () => {
    it('to the create page', () => {
      // Setup
      browser.url('/');

      // Exercise
      browser.click('a[href="/videos/create"]');
      
      // Verification
      assert.include(browser.getText('body'), 'Save a video');
    });
  });
});
