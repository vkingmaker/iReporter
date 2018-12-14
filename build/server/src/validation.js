'use strict';

module.exports = {
  signup: function signup(req, res, next) {
    var userPattern = /[A-Za-z0-9]{2,}/;
    var passPattern = /.{6,}/;
    var phoneNumberPattern = /[0-9]{11,13}/;
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validationErrorMsg = '';

    if (userPattern.test(req.body.username) && passPattern.test(req.body.password) && emailPattern.test(req.body.email) && phoneNumberPattern.test(req.body.phonenumber) && userPattern.test(req.body.firstname) && userPattern.test(req.body.lastname) && userPattern.test(req.body.othername)) {
      next();
    } else {
      if (!emailPattern.test(req.body.email)) {
        validationErrorMsg = 'please provide a valid email: the email you entered is not in the right format';
      }

      if (!userPattern.test(req.body.username)) {
        validationErrorMsg = 'your username must be upto or greater than 2 (two) characters';
      }
      if (!passPattern.test(req.body.password)) {
        validationErrorMsg = 'you password can be made of any character but it must be greater than or equal to six(6) in lenght, empty strings are not allowed';
      }

      if (!phoneNumberPattern.test(req.body.phonenumber)) {
        validationErrorMsg = 'you phone number must be digits of length between 11 and 13';
      }
      if (!userPattern.test(req.body.firstname)) {
        validationErrorMsg = 'your firstname must be upto or greater than 2 (two) characters';
      }

      if (!userPattern.test(req.body.lastname)) {
        validationErrorMsg = 'your lastname must be upto or greater than 2 (two) characters';
      }
      if (!userPattern.test(req.body.othername)) {
        validationErrorMsg = 'your othername must be upto or greater than 2 (two) characters';
      }

      res.status(400).send({
        status: res.statusCode,
        error: validationErrorMsg
      });
    }
  }
};

// export default inputValidation;