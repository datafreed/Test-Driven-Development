const router = require('express').Router();

const Video = require('../models/video');

const {buildItemObject} = require('../test/test-utils');

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', {videos});
});

router.get('/videos/create', async (req, res, next) => {
  res.render('create-video');
});

router.post('/videos/create', async (req, res, next) => {
  const {title, description, url} = req.body;
  const newVideo = new Video({title, description, url});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('create-video', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.redirect('/');
  }
}); 

router.get('/videos/:id', async (req, res, next) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  res.render('single-video-view', {video});
})

router.post('/videos/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await Video.findByIdAndRemove(id)
  res.redirect('/')
})


router.get('/videos/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const video = await Video.findOne({ _id: id});
  res.render('edit-video', {video});
});

router.post('/videos/:id/edit', async (req, res, next) => { // req works
  const {title, description, url} = req.body;
  const id = req.params.id;
  const video = new Video({title, description, url});
  video.validateSync();
  if (video.errors) {
    res.status(400).render('edit-view', {video: video});
  } else {
    await Video.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect('/')
  }
  
});

module.exports = router;
