'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postgreConnect = require('../postgreConnect');

var _postgreConnect2 = _interopRequireDefault(_postgreConnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InterventionController = function () {
  function InterventionController() {
    _classCallCheck(this, InterventionController);
  }

  _createClass(InterventionController, null, [{
    key: 'createIntervention',
    value: function createIntervention(req, res) {
      var typePattern = /^(intervention|redflag)$/i;
      var locationPattern = /\d[,]\d/;
      if (typePattern.test(req.body.type) && locationPattern.test(req.body.location)) {
        var createdBy = req.body.createdBy;
        var type = req.body.type;
        var location = req.body.location;
        var image = req.body.image;
        var video = req.body.video;
        var comment = req.body.comment;

        _postgreConnect2.default.query('INSERT INTO incident_tbl  (createdBy,type,location,image,video,comment) VALUES ($1,$2,$3, $4, $5, $6)RETURNING (id)', [createdBy, type, location, image, video, comment], function (er, result) {
          if (er) {
            return res.status(400).send({
              status: res.statusCode,
              message: 'please ensure that the values you are setting (createdBy,location,comment and type) to are all valid, the values for (createdBy) must not be out of range'
            });
          }
          return res.status(201).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'Created intervention record'
            }]
          });
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'please check your input (type,location) it can only be a redflag or an intervention, Eg. location 8.74878,632743'
        });
      }
    }
  }, {
    key: 'retrieveAllInterventions',
    value: function retrieveAllInterventions(req, res) {
      _postgreConnect2.default.query('SELECT * FROM incident_tbl WHERE type = $1', ['intervention'], function (er, result) {
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
    key: 'retrieveByIdInterventions',
    value: function retrieveByIdInterventions(req, res) {
      if (+req.params.id) {
        var id = req.params.id;

        _postgreConnect2.default.query('SELECT * FROM incident_tbl WHERE id = $1 AND type = $2', [+id, 'intervention'], function (err, result) {
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
    key: 'updateLocationById',
    value: function updateLocationById(req, res) {
      if (+req.params.id) {
        var locationPattern = /\d[,]\d/;
        if (locationPattern.test(req.body.location)) {
          var id = req.params.id;
          var location = req.body.location;

          _postgreConnect2.default.query('UPDATE incident_tbl SET (location,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [location, +id, 'intervention'], function (err, result) {
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
                  message: 'Updated intervention record\'s location'
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
    key: 'updateCommentById',
    value: function updateCommentById(req, res) {
      if (+req.params.id) {
        var id = req.params.id;
        var comment = req.body.comment;

        _postgreConnect2.default.query('UPDATE incident_tbl SET (comment,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [comment, +id, 'intervention'], function (err, result) {
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
                message: 'Updated intervention record\'s comment'
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
    key: 'deleteInterventionById',
    value: function deleteInterventionById(req, res) {
      if (+req.params.id) {
        var id = req.params.id;

        _postgreConnect2.default.query('DELETE FROM incident_tbl WHERE id = $1 AND type = $2 RETURNING (id)', [+id, 'intervention'], function (err, result) {
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
                message: 'intervention record has been deleted'
              }]
            });
          } else {
            res.status(400).send({
              status: res.statusCode,
              message: 'there is no intervention with the specified ' + id
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
    key: 'updateStatusById',
    value: function updateStatusById(req, res) {
      if (+req.params.id) {
        var statusPattern = /^(under investigation|resolved|rejected)$/i;
        if (statusPattern.test(req.body.status)) {
          var id = req.params.id;
          var status = req.body.status;

          _postgreConnect2.default.query('UPDATE incident_tbl SET (status,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [status, +id, 'intervention'], function (err, result) {
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
                  id: req.params.id,
                  // id: result.rows[0].id,
                  message: 'Updated intervention record status'
                }]
              });
            } else {
              res.status(400).send({
                status: res.statusCode,
                error: 'there is no intervention with the specified ' + id
              });
            }
          });
        } else {
          res.status(400).send({
            status: res.statusCode,
            error: 'status can be \'under investigation\' ,\'rejected\' or \'resolved\' and id should be an integer value'
          });
        }
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Id must be an integer'
        });
      }
    }
  }]);

  return InterventionController;
}();

exports.default = InterventionController;