'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Users API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const donationService = new DonationService('http://localhost:4000');

  beforeEach(function () {
    donationService.deleteAllUsers();
  });

  afterEach(function () {
    donationService.deleteAllUsers();
  });

  test('create a user', function () {
    const returnedUser = donationService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedUser._id);
  });
});