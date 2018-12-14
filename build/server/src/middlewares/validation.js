'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'signup',
    value: function signup(req, res, next) {
      var userPattern = /[A-Za-z0-9]{2,}/;
      var passPattern = /.{6,}/;
      var phoneNumberPattern = /[0-9]{11,13}/;
      var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (req.body.username && req.body.password && req.body.email && req.body.phonenumber && req.body.firstname && req.body.lastname && req.body.othername) {
        if (userPattern.test(req.body.username) && passPattern.test(req.body.password) && emailPattern.test(req.body.email) && phoneNumberPattern.test(req.body.phonenumber) && userPattern.test(req.body.firstname) && userPattern.test(req.body.lastname) && userPattern.test(req.body.othername)) {
          next();
        } else {
          res.status(400).send({
            status: res.statusCode,
            error: 'please make sure you filled the required fields (firstname,lastname,othername,email,password,username and phonenumber)'
          });
        }
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'please make sure you filled the required fields (firstname,lastname,othername,email,password,username and phonenumber)'
        });
      }
    }
  }]);

  return Validation;
}();

exports.default = Validation;