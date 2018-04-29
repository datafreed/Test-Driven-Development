const {assert} = require('chai');
const {buildItemObject, seedItemToDatabase, options} = require('../test-utils');
const Item = require('../../models/item');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User visits the update page', () => {

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase); 

    describe('updates the item', () => {
      it('and is rendered', async () => {
        const itemToUpdate = buildItemObject(options);
        const item = await Item.create({ 
          title: "title", 
          description: "description", 
          imageUrl: "https://community.moosocial.com/uploads/topics/thumbnail/1151/850_ef73970f6959b19184c4f7655e2bdcdc.png" 
        });
        return item
        browser.url(`/items/${item._id}/update`);
        browser.setValue('#title-input', itemToUpdate.title);
        browser.setValue('#description-input', itemToUpdate.description);
        browser.setValue('#imageUrl-input', itemToUpdate.imageUrl);
        browser.click('#submit-button');
        assert.include(browser.getText('body'), itemToUpdate.title);
        assert.include(browser.getAttribute('body img', 'src'), itemToUpdate.imageUrl);
      });
    });
}); 