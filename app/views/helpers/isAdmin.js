// isAdmin Helper
// Usage: `{{#isAdmin}}`
// Checks whether the user has admin or owner role
var _ = require('lodash'),
    isAdmin;

isAdmin = function (context) {
  if (_.isEmpty(context)) {
    return context.inverse(this);
  }

  var user = context.data.root.user;

  if (user.isAdmin) {
    return context.fn(this);
  }

  return context.inverse(this);
};

module.exports = isAdmin;