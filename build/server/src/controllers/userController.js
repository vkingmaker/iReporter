'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postgreConnect = require('../postgreConnect');

var _postgreConnect2 = _interopRequireDefault(_postgreConnect);

var _verify = require('../middlewares/verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bcrypt = require('bcryptjs');

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signUp',
    value: function signUp(req, res) {
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var othername = req.body.othername;
      var email = req.body.email;
      var phonenumber = req.body.phonenumber;
      var username = req.body.username;
      var password = req.body.password;

      var validationErrorMsg = void 0;
      if (firstname.length && lastname.length && othername.length && email.length && phonenumber.length && username.length && password.length) {
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
      } else {
        if (!firstname.length) {
          validationErrorMsg = 'please provide a value for firstname: empty fields are not allowed';
        }
        if (!lastname.length) {
          validationErrorMsg = 'please provide a value for lastname: empty fields are not allowed';
        }
        if (!othername.length) {
          validationErrorMsg = 'please provide a value for othername: empty fields are not allowed';
        }
        if (!email.length) {
          validationErrorMsg = 'please provide a value for email: empty fields are not allowed';
        }
        if (!phonenumber.length) {
          validationErrorMsg = 'please provide a value for phonenumber: empty fields are not allowed';
        }
        if (!username.length) {
          validationErrorMsg = 'please provide a value for username: empty fields are not allowed';
        }
        if (!password.length) {
          validationErrorMsg = 'please provide a value for password: empty fields are not allowed';
        }
        res.status(400).send({
          status: res.statusCode,
          error: validationErrorMsg
        });
      }
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;

        _postgreConnect2.default.query('SELECT * FROM user_tbl WHERE email = $1', [email], function (error, results) {
          if (error) {
            res.status(501).send({
              status: res.statusCode,
              error: 'invalid input: inter server error'
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
                  error: 'Please input a valid password and try again'
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
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'Email or password is incorrect please provide the valid credentials and try again'
        });
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;