const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const intervention = require('./build/server/src/interventionRouter');
const report = require('./build/server/src/report');

dotenv.config();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
// Routes
app.use('/api/v1/interventions', intervention);
app.use('/api/v1/red-flags', report);

// Catch 404 and forward to error handler
// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message,
  });
});
const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console

module.exports = app;
