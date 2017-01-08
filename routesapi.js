const CandidatesApi = require('./app/api/candidatesapi');
const UsersApi = require('./app/api/usersapi');
const MicrosApi = require('./app/api/microsapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: CandidatesApi.find },
  { method: 'GET', path: '/api/candidates/{id}', config: CandidatesApi.findOne },
  { method: 'POST', path: '/api/candidates', config: CandidatesApi.create },
  { method: 'DELETE', path: '/api/candidates/{id}', config: CandidatesApi.deleteOne },
  { method: 'DELETE', path: '/api/candidates', config: CandidatesApi.deleteAll },

  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },

  { method: 'GET', path: '/api/micros', config: MicrosApi.find },
  { method: 'GET', path: '/api/micros/{id}', config: MicrosApi.findOne },
  { method: 'GET', path: '/api/usermicros/{id}', config: MicrosApi.findFromUser },
  { method: 'DELETE', path: '/api/micros/{id}', config: MicrosApi.deleteOne },

];