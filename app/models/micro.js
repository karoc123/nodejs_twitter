'use strict';

const mongoose = require('mongoose');

const microSchema = mongoose.Schema({
  time: Number,
  text: String,
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Micro = mongoose.model('Micro', microSchema);
module.exports = Micro;
