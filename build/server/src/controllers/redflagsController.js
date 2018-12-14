'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postgreConnect = require('../postgreConnect');

var _postgreConnect2 = _interopRequireDefault(_postgreConnect);

var _db = require('../mock/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var records = (0, _db2.default)();

var RedflagsController = function () {
  function RedflagsController() {
    _classCallCheck(this, RedflagsController);
  }

  _createClass(RedflagsController, null, [{
    key: 'clearRecord',
    value: function clearRecord(req, res) {
      records.splice(0);
      res.status(200).send({
        status: res.statusCode,
        data: [{
          message: 'multiple red-flag records deleted'
        }]
      });
    }
  }, {
    key: 'deleteRecordGivenAnId',
    value: function deleteRecordGivenAnId(req, res) {
      if (+req.params.id) {
        var id = req.params.id;

        _postgreConnect2.default.query('DELETE FROM incident_tbl WHERE id = $1 AND type = $2 RETURNING (id)', [+id, 'redflag'], function (err, result) {
          if (err) {
            res.status(400).send({
              status: res.statusCode,
              error: err
            });
          } else if (result.rows.length) {
            res.status(200).send({
              status: res.statusCode,
              data: [{
                id: result.rows[0].id,
                message: 'redflad record has been deleted'
              }]
            });
          } else {
            res.status(400).send({
              status: res.statusCode,
              message: 'there is no redflag with the specified ' + id
            });
          }
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Id must be an integer'
        });
      }
    }
  }, {
    key: 'updateLocationGivenAnId',
    value: function updateLocationGivenAnId(req, res) {
      if (+req.params.id) {
        var locationPattern = /\d[,]\d/;
        if (locationPattern.test(req.body.location)) {
          var id = req.params.id;
          var location = req.body.location;

          _postgreConnect2.default.query('UPDATE incident_tbl SET (location,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [location, +id, 'redflag'], function (err, result) {
            if (err) {
              res.status(400).send({
                status: res.statusCode,
                error: err
              });
            }
            if (result.rows[0]) {
              res.status(200).send({
                status: res.statusCode,
                data: [{
                  id: result.rows[0].id,
                  message: 'Updated redflag record\'s location'
                }]
              });
            } else {
              res.status(400).send({
                status: res.statusCode,
                error: 'there is no incident with that id ' + id
              });
            }
          });
        } else {
          res.status(400).send({
            status: res.statusCode,
            error: 'please ensure that location is in the right format Eg 8.8957,289275'
          });
        }
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Id must be an integer'
        });
      }
    }
  }, {
    key: 'updateCommentGivenAnId',
    value: function updateCommentGivenAnId(req, res) {
      if (+req.params.id) {
        var id = req.params.id;
        var comment = req.body.comment;

        _postgreConnect2.default.query('UPDATE incident_tbl SET (comment,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [comment, +id, 'redflag'], function (err, result) {
          if (err) {
            res.status(400).send({
              status: res.statusCode,
              error: err
            });
          }
          if (result.rows[0]) {
            res.status(200).send({
              status: res.statusCode,
              data: [{
                id: result.rows[0].id,
                message: 'Updated redflag record\'s comment'
              }]
            });
          } else {
            res.status(400).send({
              status: res.statusCode,
              error: 'there is no incident with the id ' + id
            });
          }
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Id must be an integer'
        });
      }
    }
  }, {
    key: 'getRecordGivenAnId',
    value: function getRecordGivenAnId(req, res) {
      if (+req.params.id) {
        var id = req.params.id;

        _postgreConnect2.default.query('SELECT * FROM incident_tbl WHERE id = $1 AND type = $2', [+id, 'redflag'], function (err, result) {
          if (err) {
            res.status(400).send({
              status: res.statusCode,
              error: err
            });
          }
          if (result.rows[0]) {
            res.status(200).send({
              status: res.statusCode,
              data: result.rows
            });
          } else {
            res.status(400).send({
              status: res.statusCode,
              error: 'there is no incidents with the id ' + id
            });
          }
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Id must be a value of integer'
        });
      }
    }
  }, {
    key: 'getRecords',
    value: function getRecords(req, res) {
      _postgreConnect2.default.query('SELECT * FROM incident_tbl WHERE type = $1', ['redflag'], function (er, result) {
        if (er) {
          res.status(400).send({
            status: res.statusCode,
            message: er
          });
        } else {
          res.status(200).send({
            status: res.statusCode,
            data: result.rows
          });
        }
      });
    }
  }, {
    key: 'updateStatusById',
    value: function updateStatusById(req, res) {
      var id = req.params.id;
      var status = req.body.status;

      _postgreConnect2.default.query('UPDATE incident_tbl SET (status,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [status, +id, 'redflag'], function (err, result) {
        if (err) {
          res.status(400).send({
            status: res.statusCode,
            error: err
          });
        } else if (result.rows.length) {
          res.status(200).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'Updated redflag record status'
            }]
          });
        } else {
          res.status(400).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'there is no redflag with the specified ' + id
            }]
          });
        }
      });
    }
  }]);

  return RedflagsController;
}();

exports.default = RedflagsController;