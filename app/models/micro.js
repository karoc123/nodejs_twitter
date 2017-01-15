'use strict';

const mongoose = require('mongoose');

const microSchema = mongoose.Schema({
  time: Date,
  text: String,
  image: String,
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Micro = mongoose.model('Micro', microSchema);
module.exports = Micro;
