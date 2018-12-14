'use strict';

var _require = require('pg'),
    Client = _require.Client;

var client = new Client({
  connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/i-reporter'
});
client.connect().then(function () {
  return 'connected';
}).catch(function (err) {
  return 'connection error ' + err.stack;
});

module.exports = client;