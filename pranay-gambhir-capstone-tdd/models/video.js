const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Video',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  })
);
