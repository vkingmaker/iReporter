const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/i-reporter',
});
client.connect()
  .then(() => ('connected'))
  .catch(err => (`connection error ${err.stack}`));

module.exports = client;
