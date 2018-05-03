#!/usr/bin/env node

const {mongoose, databaseUrl, options} = require('../database');
const Video = require('../models/video');

const seed = async () => {
/*  await mongoose.connect(databaseUrl, options);
  const video1 = {
    title: 'Title',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu nibh velit. Phasellus libero nisl, dictum ut feugiat sit amet, varius a magna. Etiam id diam nec dolor luctus ornare ut ut risus. Donec vel laoreet ex. Quisque sapien nisl, accumsan eget blandit a, porta vitae velit. Nunc ipsum justo, pellentesque non dolor vitae, volutpat sagittis est. Morbi commodo, leo at condimentum pretium, turpis tellus eleifend ligula, sed efficitur elit massa id est. Suspendisse ultricies nibh vitae eleifend varius. Sed eu diam dignissim, faucibus ante in, vehicula ex. Praesent eu tempus odio.`,
    url: 'https://www.youtube.com/embed/6lutNECOZFw',
  };
  await Video.create(video1); */
}; 

seed()
.then(() => {
  console.log('Seeded database sucessfully');
  process.exit(0);
})
.catch(err => {
  console.log('Database seed unsuccessful');
  throw err;
  process.exit(1);
});
