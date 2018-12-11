import client from './postgreConnect';
import Verify from './verify';

const bcrypt = require('bcryptjs');

class InterventionController {
  static signUp(req, res) {
    const userPattern = /[A-Za-z0-9]{2,}/;
    const passPattern = /.{6,}/;
    const phoneNumberPattern = /[0-9]{11,13}/;
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { othername } = req.body;
    const { email } = req.body;
    const { phonenumber } = req.body;
    let validationErrorMsg = '';

    if (userPattern.test(req.body.username) && passPattern.test(req.body.password)
    && emailPattern.test(req.body.email) && phoneNumberPattern.test(req.body.phonenumber)
    && userPattern.test(req.body.firstname) && userPattern.test(req.body.lastname)
    && userPattern.test(req.body.othername)) {
      const { username } = req.body;
      const { password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            res.status(500).send({
              message: 'password could not be hashed',
            });
          }
          client.query('INSERT INTO user_tbl  (firstname,lastname,othername,email,phonenumber,username,password) VALUES ($1,$2,$3, $4, $5, $6, $7)', [firstname, lastname, othername, email, phonenumber, username, hash], (er) => {
            if (er) {
              res.status(400).send({
                status: res.statusCode,
                message: er,
              });
            } else {
              const user = {
                firstname, lastname, othername, email, phonenumber, username,
              };
              const token = Verify.getToken({ username });
              res.header('x-auth', token).status(201).send({
                status: res.statusCode,
                data: [{
                  user,
                  token,
                }],
              });
            }
          });
        });
      });
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
        error: validationErrorMsg,
      });
    }
  }
}
export default InterventionController;
