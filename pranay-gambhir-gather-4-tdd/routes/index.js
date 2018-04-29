const router = require('express').Router();

const Item = require('../models/item');

const {buildItemObject} = require('../test/test-utils');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }

}); 

router.get('/items/:id/update', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id});
  res.render('update', {item});
});

router.post('/items/:id/update', async (req, res, next) => { // req works
  const {title, description, imageUrl} = req.body;
  const id = req.params.id;
  const item = new Item({title, description, imageUrl});
  item.validateSync();
  if (item.errors) {
    res.status(400).render('update', {item: item});
  } else {
    await Item.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect('/')
  }
  
});

router.get('/items/:id', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.render('single-item-view', {item});
})

router.get('/items/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.render('delete', {item});
})

router.post('/items/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await Item.findByIdAndRemove(id)
  res.redirect('/')
  /*const item = await Item.findById(id)
  const oldItem = new Item(item);
  await oldItem.remove();  */
})


module.exports = router;
