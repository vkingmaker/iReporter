const jwt = require('jsonwebtoken');

class Verify {
  static getToken(user) {
    return jwt.sign(user, process.env.secretOrPrivateKey, {
      expiresIn: 3600,
    });
  }

  static verifyAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];

    if (token) {
      jwt.verify(token, process.env.secretOrPrivateKey, (err, decoded) => {
        if (decoded.isAdmin) {
          req.decoded = decoded;
          next();
        }

        if (err) {
          res.status(401).send(err);
        }
      });
    } else {
      const err = { status: 403, message: 'You must but a verified Admin' };
      res.status(403).send(err);
    }
  }

  static verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];

    if (token) {
      jwt.verify(token, process.env.secretOrPrivateKey, (err, decoded) => {
        if (err) {
          res.status(401).send(err);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }
}

module.exports = Verify;
