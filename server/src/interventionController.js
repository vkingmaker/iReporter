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

  static login(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    client.query('SELECT * FROM user_tbl WHERE email = $1', [email], (error, results) => {
      if (error) {
        res.status(501).send({
          status: res.statusCode,
          error: 'an error occured while trying to read your details from the database',
        });
      }
      if (results.rows[0]) {
        bcrypt.compare(password, results.rows[0].password, (err, hash) => {
          if (err) {
            res.status(500).send({
              status: res.statusCode,
              error: 'a problem occured while trying to compare your password',
            });
          }
          if (hash === true) {
            const userDetails = results.rows[0];
            const user = {
              firstname: userDetails.firstname,
              lastname: userDetails.lastname,
              othername: userDetails.lastname,
              email: userDetails.email,
              isAdmin: userDetails.isAdmin,
              phonenumber: userDetails.phonenumber,
            };
            const token = Verify.getToken({ email, admin: results.rows[0].admin });
            res.header('x-auth', token).status(200).send({
              success: 'Login successful',
              data: [{
                token,
                user,
              }],
            });
          } else {
            res.status(401).send({
              status: res.statusCode,
              error: 'You are not a registered user please signup and try again',
            });
          }
        });
      } else {
        res.status(400).send({
          status: res.statusCode,
          error: 'please provide a valid Email address',
        });
      }
    });
  }

  static createIntervention(req, res) {
    const { createdBy } = req.body;
    const { type } = req.body;
    const { location } = req.body;
    const { image } = req.body;
    const { video } = req.body;
    const { comment } = req.body;

    client.query('INSERT INTO incident_tbl  (createdBy,type,location,image,video,comment) VALUES ($1,$2,$3, $4, $5, $6)RETURNING (id)', [createdBy, type, location, image, video, comment], (er, result) => {
      if (er) {
        res.status(400).send({
          status: res.statusCode,
          message: er,
        });
      } else {
        res.status(201).send({
          status: res.statusCode,
          data: [{
            id: result.rows[0].id,
            message: 'Created intervention record',
          }],
        });
      }
    });
  }

  static retrieveAllInterventions(req, res) {
    client.query('SELECT * FROM incident_tbl', (er, result) => {
      if (er) {
        res.status(400).send({
          status: res.statusCode,
          message: er,
        });
      } else {
        res.status(200).send({
          status: res.statusCode,
          data: result.rows,
        });
      }
    });
  }
}
export default InterventionController;
