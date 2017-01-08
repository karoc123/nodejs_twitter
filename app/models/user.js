'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gravatarUrl: String,
  password: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
