'use strict';

const Micro = require('../models/micro');
const Boom = require('boom');

exports.find = {

  auth: false,

  handler: function (request, reply) {
    Micro.find({}).exec().then(micros => {
      reply(micros);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    Micro.findOne({ _id: request.params.id }).then(micro => {
      if (micro != null) {
        reply(micro);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.findFromUser = {

  auth: false,

  handler: function (request, reply) {
    Micro.find({ poster: request.params.id }).populate('poster').sort( { time : -1 } ).then(micros => {
      if (micros != null) {
        reply(micros);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    Micro.remove({ _id: request.params.id }).then(micro => {
      reply(Micro).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};