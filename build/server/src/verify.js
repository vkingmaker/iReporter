'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwt = require('jsonwebtoken');

var Verify = function () {
  function Verify() {
    _classCallCheck(this, Verify);
  }

  _createClass(Verify, null, [{
    key: 'getToken',
    value: function getToken(user) {
      return jwt.sign(user, process.env.secretOrPrivateKey, {
        expiresIn: 3600
      });
    }
  }, {
    key: 'verifyAdmin',
    value: function verifyAdmin(req, res, next) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];

      if (token) {
        jwt.verify(token, process.env.secretOrPrivateKey, function (err, decoded) {
          if (decoded.isadmin) {
            req.decoded = decoded;
            next();
          }

          if (err) {
            res.status(401).send(err);
          }
        });
      } else {
        var err = { status: 403, message: 'You must but a verified Admin' };
        res.status(403).send(err);
      }
    }
  }, {
    key: 'verifyUser',
    value: function verifyUser(req, res, next) {
      var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];

      if (token) {
        jwt.verify(token, process.env.secretOrPrivateKey, function (err, decoded) {
          if (err) {
            res.status(401).send(err);
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    }
  }]);

  return Verify;
}();

module.exports = Verify;