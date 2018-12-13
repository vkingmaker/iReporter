const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../server/src/postgreConnect');
const Verify = require('../server/src/verify');
const server = require('../app');

// console.log(server);
let should = chai.should();
let customeToken;

chai.use(chaiHttp);

before((done) => {
  client.query('TRUNCATE user_tbl, incident_tbl RESTART IDENTITY', (err) => {
    if (err) {
      throw new Error('Could not truncate the table for testing');
    } else {
      client.query('INSERT INTO user_tbl  (firstname,lastname,othername,email,phonenumber,username,password,isAdmin) VALUES ($1,$2,$3, $4, $5, $6, $7, $8) RETURNING (isadmin)', ['Otti', 'Grant', 'Onyeukwu', 'otti.onyeukwu@gmail.com', '08068753218', 'wizzywise', '$2a$10$JR0.jzaGDj6pGHDe5W22h.rDMQqUYvi.2wxHhpKKPcSpb0MgCwuS.', true], (er, results) => {
        if (er) {
          throw new Error('an error occured while trying to communicate with the database');
        } else {
          customeToken = Verify.getToken(results.rows[0]);
          done();
        }
      });
    }
  });
});

describe('Parent test block for Intervention', () => {
  it('it should test the users signup credentials', (done) => {
    const user = {
      firstname: 'Monday',
      lastname: 'Akubudike',
      othername: 'Vkingmaker',
      email: 'vkingmar@gmail.com',
      phonenumber: '07031977216',
      username: 'vkingmaker',
      password: 'akubudike1',
    };
    chai.request(server)
      .post('/api/v1/interventions/auth/signup')
      .send(user)
      .end((err, res) => {
        const { token } = res.body.data[0];
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('username').eql('vkingmaker');
        res.body.data[0].user.should.have.property('lastname').eql('Akubudike');
        res.body.data[0].user.should.have.property('email').eql('vkingmar@gmail.com');
        res.body.data[0].user.should.have.property('phonenumber').eql('07031977216');
        res.body.data[0].user.should.have.property('username').eql('vkingmaker');
        res.body.data[0].user.should.have.property('firstname').eql('Monday');
        res.body.data[0].token.should.have.be.eql(token);
        res.body.data[0].token.should.be.a('string');
        done();
      });
  });

  it('should compare the email and password provided by the user to ensure he or she is registered', (done) => {
    const user = {
      email: 'otti.onyeukwu@gmail.com',
      password: 'akubudike1',
    };

    chai.request(server)
      .post('/api/v1/interventions/auth/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data[0].user.should.have.property('email').eql('otti.onyeukwu@gmail.com');
        res.body.data.should.be.a('array');
        res.body.data[0].token.should.be.a('string');
        res.body.data[0].user.should.be.a('object');
        done();
      });
  });

  it('should create new interventions when the user inputs the require details', (done) => {
    const incident = {
      createdBy: 1,
      type: 'intervention',
      location: '10.65883N/8.8747849E',
      image: ["'ejdfklhakleidkjadgkhdkjsfkasjrfdkjf','sahanfdsbajsdhjadsfjbhadsnfbabsnfbdsfbbdsf'"],
      comment: 'Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter',
    };
    chai.request(server)
      .post('/api/v1/interventions')
      .set('x-auth', customeToken)
      .send(incident)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(201);
        res.body.data[0].should.have.property('id').eql(1);
        res.body.data[0].should.have.property('message').eql('Created intervention record');
        done();
      });
  });

  it('should retrieve all the interventions in the database', (done) => {
    chai.request(server)
      .get('/api/v1/interventions')
      .set('x-auth', customeToken)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data[0].should.have.property('type').eql('intervention');
        res.body.data[0].should.have.property('comment').eql('Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter');
        done();
      });
  });

  it('should retrive an intervention of a given id', (done) => {
    chai.request(server)
      .get('/api/v1/interventions/1')
      .set('x-auth', customeToken)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('status').eql('draft');
        res.body.data[0].should.have.property('type').eql('intervention');
        res.body.data[0].should.have.property('comment').eql('Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter');
        done();
      });
  });

  it('should update the location of an intervention of a given id', (done) => {
    const location = {
      id: 1,
      location: '10.3487486E/9.03437634N',
    };
    chai.request(server)
      .patch(`/api/v1/interventions/${location.id}/location`)
      .set('x-auth', customeToken)
      .send(location)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('Updated intervention record\'s location');
        res.body.data[0].should.have.property('id').eql(1);
        done();
      });
  });

  it('should update the comment of an intervention of a given id', (done) => {
    const location = {
      id: 1,
      comment: 'changed the comment for good, Always test your code',
    };
    chai.request(server)
      .patch(`/api/v1/interventions/${location.id}/comment`)
      .set('x-auth', customeToken)
      .send(location)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('Updated intervention record\'s comment');
        res.body.data[0].should.have.property('id').eql(1);
        done();
      });
  });

  it('should update the status of an intervention of a given id', (done) => {
    const status = {
      id: 1,
      status: 'resolved',
    };
    chai.request(server)
      .patch(`/api/v1/interventions/${status.id}/status`)
      .set('x-auth', customeToken)
      .send(status)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('Updated intervention record status');
        res.body.data[0].should.have.property('id').eql(1);
        done();
      });
  });

  it('should delete an intervention of a given id', (done) => {
    chai.request(server)
      .delete('/api/v1/interventions/1')
      .set('x-auth', customeToken)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('intervention record has been deleted');
        done();
      });
  });

  it('should delete an intervention of a given id using wrong parameter', (done) => {
    const id = {
      id: 2,
    };
    chai.request(server)
      .delete(`/api/v1/interventions/${id}`)
      .set('x-auth', customeToken)
      .end((err, res) => {
        if (err) {
          res.should.have.status(400);
          done();
        }
      });
  });
});
