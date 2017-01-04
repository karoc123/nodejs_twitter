'use strict';

const User = require('../models/user');
const Micro = require('../models/micro');
const Joi = require('joi');

exports.main = {
  handler: function (request, reply) {
    Micro.find({}).populate('poster').sort( { time : -1 } ).then(allMicros => {
      reply.view('micro', {
        title: 'All Micros',
        micros: allMicros,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.timeline = {
  handler: function (request, reply) {
    Micro.find({ poster: request.params.user }).populate('poster').sort( { time : -1 } ).then(allMicros => {
      reply.view('micro', {
        title: 'Timeline',
        micros: allMicros,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.posting = {

  validate: {

    payload: {
      text: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('micro', {
        title: 'Micro error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;

    let data = request.payload;
    data.time = Date.now();

    User.findOne({ email: userEmail }).then(user => {
      data.poster = user;
      const micro = new Micro(data);

      micro.save().then(newMicro => {
        reply.redirect('/micro');
      }).catch(err => {
        reply.redirect('/');
      });
    });


  },

 /* handler: function (request, reply) {
    let data = request.payload;
    data.time = Date.now();
    const micro = new Micro(data);

    micro.save().then(newMicro => {
      reply.redirect('/micro');
    }).catch(err => {
      reply.redirect('/');
    });
  },
**/
};