const Accounts = require('./app/controllers/accounts');
const Assets = require('./app/controllers/assets');
const Blog = require('./app/controllers/micros');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/profile/{email?}', config: Accounts.profile },

  { method: 'GET', path: '/micro', config: Blog.main },
  { method: 'GET', path: '/followmicro', config: Blog.followmicro },
  { method: 'POST', path: '/micro', config: Blog.posting },
  { method: 'GET', path: '/timeline/{user?}', config: Blog.timeline },
  { method: 'GET', path: '/delete/{id?}', config: Blog.deleteOne },
  { method: 'GET', path: '/stats', config: Accounts.stats },
  { method: 'GET', path: '/follow/{id?}', config: Accounts.followUser },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
