'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postgreConnect = require('./postgreConnect');

var _postgreConnect2 = _interopRequireDefault(_postgreConnect);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bcrypt = require('bcryptjs');

var InterventionController = function () {
  function InterventionController() {
    _classCallCheck(this, InterventionController);
  }

  _createClass(InterventionController, null, [{
    key: 'signUp',
    value: function signUp(req, res) {
      // const userPattern = /[A-Za-z0-9]{2,}/;
      // const passPattern = /.{6,}/;
      // const phoneNumberPattern = /[0-9]{11,13}/;
      // const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var othername = req.body.othername;
      var email = req.body.email;
      var phonenumber = req.body.phonenumber;
      // let validationErrorMsg = '';

      // if (userPattern.test(req.body.username) && passPattern.test(req.body.password)
      //   && emailPattern.test(req.body.email) && phoneNumberPattern.test(req.body.phonenumber)
      //   && userPattern.test(req.body.firstname) && userPattern.test(req.body.lastname)
      //   && userPattern.test(req.body.othername)) {

      var username = req.body.username;
      var password = req.body.password;

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (error, hash) {
          if (error) {
            res.status(500).send({
              message: 'password could not be hashed'
            });
          }
          _postgreConnect2.default.query('INSERT INTO user_tbl  (firstname,lastname,othername,email,phonenumber,username,password) VALUES ($1,$2,$3, $4, $5, $6, $7)', [firstname, lastname, othername, email, phonenumber, username, hash], function (er) {
            if (er) {
              res.status(400).send({
                status: res.statusCode,
                message: er
              });
            } else {
              var user = {
                firstname: firstname, lastname: lastname, othername: othername, email: email, phonenumber: phonenumber, username: username
              };
              var token = _verify2.default.getToken({ username: username });
              res.header('x-auth', token).status(201).send({
                status: res.statusCode,
                data: [{
                  user: user,
                  token: token
                }]
              });
            }
          });
        });
      });
      // } else {
      // if (!emailPattern.test(req.body.email)) {
      //   validationErrorMsg = 'please provide a valid email: the email you entered is not in the right format';
      // }

      // if (!userPattern.test(req.body.username)) {
      //   validationErrorMsg = 'your username must be upto or greater than 2 (two) characters';
      // }
      // if (!passPattern.test(req.body.password)) {
      //   validationErrorMsg = 'you password can be made of any character but it must be greater than or equal to six(6) in lenght, empty strings are not allowed';
      // }

      // if (!phoneNumberPattern.test(req.body.phonenumber)) {
      //   validationErrorMsg = 'you phone number must be digits of length between 11 and 13';
      // }
      // if (!userPattern.test(req.body.firstname)) {
      //   validationErrorMsg = 'your firstname must be upto or greater than 2 (two) characters';
      // }

      // if (!userPattern.test(req.body.lastname)) {
      //   validationErrorMsg = 'your lastname must be upto or greater than 2 (two) characters';
      // }
      // if (!userPattern.test(req.body.othername)) {
      //   validationErrorMsg = 'your othername must be upto or greater than 2 (two) characters';
      // }

      // res.status(400).send({
      //   status: res.statusCode,
      //   error: validationErrorMsg,
      // });
      // }
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      var email = req.body.email;
      var password = req.body.password;


      _postgreConnect2.default.query('SELECT * FROM user_tbl WHERE email = $1', [email], function (error, results) {
        if (error) {
          res.status(501).send({
            status: res.statusCode,
            error: 'an error occured while trying to read your details from the database'
          });
        }
        if (results.rows[0]) {
          bcrypt.compare(password, results.rows[0].password, function (err, hash) {
            if (err) {
              res.status(500).send({
                status: res.statusCode,
                error: 'a problem occured while trying to compare your password'
              });
            }
            if (hash === true) {
              var userDetails = results.rows[0];
              var user = {
                firstname: userDetails.firstname,
                lastname: userDetails.lastname,
                othername: userDetails.lastname,
                email: userDetails.email,
                isAdmin: userDetails.isAdmin,
                phonenumber: userDetails.phonenumber
              };
              var token = _verify2.default.getToken({ email: email, admin: results.rows[0].isadmin });
              res.header('x-auth', token).status(200).send({
                success: 'Login successful',
                data: [{
                  token: token,
                  user: user
                }]
              });
            } else {
              res.status(401).send({
                status: res.statusCode,
                error: 'You are not a registered user please signup and try again'
              });
            }
          });
        } else {
          res.status(400).send({
            status: res.statusCode,
            error: 'please provide a valid Email address'
          });
        }
      });
    }
  }, {
    key: 'createIntervention',
    value: function createIntervention(req, res) {
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
            message: er
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
    }
  }, {
    key: 'retrieveAllInterventions',
    value: function retrieveAllInterventions(req, res) {
      _postgreConnect2.default.query('SELECT * FROM incident_tbl', function (er, result) {
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
      var id = req.params.id;


      _postgreConnect2.default.query('SELECT * FROM incident_tbl WHERE id = $1', [+id], function (err, result) {
        if (err) {
          res.status(400).send({
            status: res.statusCode,
            error: err
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
    key: 'updateLocationById',
    value: function updateLocationById(req, res) {
      var id = req.params.id;
      var location = req.body.location;

      _postgreConnect2.default.query('UPDATE incident_tbl SET (location,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 RETURNING (id)', [location, +id], function (err, result) {
        if (err) {
          res.status(400).send({
            status: res.statusCode,
            error: err
          });
        } else {
          res.status(200).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'Updated intervention record\'s location'
            }]
          });
        }
      });
    }
  }, {
    key: 'updateCommentById',
    value: function updateCommentById(req, res) {
      var id = req.params.id;
      var comment = req.body.comment;

      _postgreConnect2.default.query('UPDATE incident_tbl SET (comment,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 RETURNING (id)', [comment, +id], function (err, result) {
        if (err) {
          res.status(400).send({
            status: res.statusCode,
            error: err
          });
        } else {
          res.status(200).send({
            status: res.statusCode,
            data: [{
              id: result.rows[0].id,
              message: 'Updated intervention record\'s comment'
            }]
          });
        }
      });
    }
  }, {
    key: 'deleteInterventionById',
    value: function deleteInterventionById(req, res) {
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
    }
  }, {
    key: 'updateStatusById',
    value: function updateStatusById(req, res) {
      var id = req.params.id;
      var status = req.body.status;

      _postgreConnect2.default.query('UPDATE incident_tbl SET (status,modifiedon) = ($1,CURRENT_DATE) WHERE id = $2 AND type = $3 RETURNING (id)', [status, +id, 'intervention'], function (err, result) {
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

  return InterventionController;
}();

exports.default = InterventionController;