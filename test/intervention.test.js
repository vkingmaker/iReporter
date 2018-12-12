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
      client.query('INSERT INTO user_tbl  (firstname,lastname,othername,email,phonenumber,username,password) VALUES ($1,$2,$3, $4, $5, $6, $7) RETURNING (firstname)', ['Otti', 'Grant', 'Onyeukwu', 'otti.onyeukwu@gmail.com', '08068753218', 'wizzywise', '$2a$10$JR0.jzaGDj6pGHDe5W22h.rDMQqUYvi.2wxHhpKKPcSpb0MgCwuS.'], (er, results) => {
        if (er) {
          throw new Error('an error occured while trying to communicate with the database');
        } else {
          console.log(results);
          console.log('ABOVE RESULT');
          console.log(results.rows[0]);
          customeToken = Verify.getToken(results.rows[0]);
          console.log('BEFOREEEEEEEEEE');
          done();
        }
      });
    }
  });
});

describe('Parent test block for Intervention', () => {
  // let myToken = token;
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
  // });

  // describe('/POST /api/v1/interventions/auth/login', () => {
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
  // });

  // describe('/POST /api/v1/interventions', () => {
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
        console.log('GHHHHHHHHHHHHHHHHHHH');
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
  // });

  // describe('/GET/:id /api/v1/interventions/:id', () => {
  it('should retrive an intervention of a given id', () => {
    chai.request(server)
      .get('/api/v1/interventions/1')
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.data.should.be.a('arra');
        res.body.data[0].length.eql(0);
      });
  });
});
