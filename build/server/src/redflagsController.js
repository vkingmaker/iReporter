'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postgreConnect = require('./postgreConnect');

var _postgreConnect2 = _interopRequireDefault(_postgreConnect);

var _db = require('./mock/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      var checkId = [];
      checkId = records.filter(function (value) {
        if (value.id === +req.params.id) {
          return true;
        }
      });
      if (checkId[0]) {
        records.splice(req.params.id - 1, 1);
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: +req.params.id,
            message: 'red-flag record has been deleted'
          }]
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          data: [{
            id: +req.params.id,
            message: 'there is no record with the specified id'
          }]
        });
      }
    }
  }, {
    key: 'updateLocationGivenAnId',
    value: function updateLocationGivenAnId(req, res) {
      var locationToUpdate = records.filter(function (value) {
        if (value.id === +req.params.id) {
          return value;
        }
      });
      locationToUpdate[0].location = req.body.location;
      res.status(200).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'Updated red-flag record\'s location'
        }]
      });
    }
  }, {
    key: 'updateCommentGivenAnId',
    value: function updateCommentGivenAnId(req, res) {
      var recordToUpdate = records.filter(function (value) {
        if (value.id === +req.params.id) {
          return value;
        }
      });
      recordToUpdate[0].comment = req.body.comment;
      res.status(200).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'Updated red-flag record\'s comment'
        }]
      });
    }
  }, {
    key: 'getRecordGivenAnId',
    value: function getRecordGivenAnId(req, res) {
      var particularRecord = records.filter(function (value) {
        if (value.id === +req.params.id) return value;
      });
      res.status(200).send({
        status: res.statusCode,
        data: [].concat(_toConsumableArray(particularRecord))
      });
    }
  }, {
    key: 'createRecord',
    value: function createRecord(req, res) {
      var addedRecord = {};
      if (records.length) {
        req.body.id = records[records.length - 1].id + 1;
        addedRecord = req.body;
        records.push(req.body);
      } else {
        req.body.id = 1;
        addedRecord = req.body;
        records.push(req.body);
      }
      res.status(201).send({
        status: res.statusCode,
        data: [{
          id: addedRecord.id,
          message: 'Created red-flag-record!'
        }]
      });
    }
  }, {
    key: 'getRecords',
    value: function getRecords(req, res) {
      res.send({
        status: res.statusCode,
        data: [{
          message: 'multiple red-flag records deleted'
        }]
      });
      if (checkId[0]) {
        records.splice(req.params.id - 1, 1);
        res.status(200).send({
          status: res.statusCode,
          data: [{
            id: +req.params.id,
            message: 'red-flag record has been deleted'
          }]
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          data: [{
            id: +req.params.id,
            message: 'there is no record with the specified id'
          }]
        });
      }
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
              message: 'Updated intervention record status'
            }]
          });
        } else {
          res.status(400).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'there is no intervention with the specified ' + id
            }]
          });
        }
      });
    }
  }]);

  return RedflagsController;
}();

exports.default = RedflagsController;