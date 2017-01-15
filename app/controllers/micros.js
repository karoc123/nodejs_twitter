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

exports.followmicro = {
  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;

    User.findOne({ email: userEmail }).populate('following').then(user => {

      let followIds = [];
      for (var i = 0; i < user.following.length; i++) {
        followIds.push(user.following[i].id);
      }

      Micro.find({poster: { $in: followIds }}).populate('poster').sort( { time : -1 } ).then(allMicros => {

        reply.view('followmicro', {
          title: 'Personal news feed',
          micros: allMicros,
        });
      }).catch(err => {
        reply.redirect('/');
      });
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

    // there needs to be a regex to make sure no cross site scripting is possible?!
    payload: {
      text: Joi.string().required(),
      image: Joi.string().allow(''),
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

      user.numberOfMicros = user.numberOfMicros+1;
      user.save().then(user => {
        micro.save().then(newMicro => {
          reply.redirect('/micro');
        }).catch(err => {
          reply.redirect('/');
        });
      });
    });


  },
};

exports.deleteOne = {

  handler: function (request, reply) {
    Micro.remove({ _id: request.params.id }).then(micro => {
      Micro.find({}).populate('poster').sort( { time : -1 } ).then(allMicros => {
        reply.view('micro', {
          title: 'All Micros',
          micros: allMicros,
        });
      }).catch(err => {
        reply.redirect('/');
      });    }).catch(err => {
      reply.redirect('/');
    });
  },

};