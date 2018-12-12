const chai = require('chai');
const chaiHttp = require('chai-http');
const client = require('../server/src/postgreConnect');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);

beforeEach((done) => {
  client.query('TRUNCATE user_tbl, incident_tbl RESTART IDENTITY', (err) => {
    if (err) {
      throw new Error('Could not truncate the table for testing');
    }
    client.query('INSERT INTO user_tbl  (firstname,lastname,othername,email,phonenumber,username,password) VALUES ($1,$2,$3, $4, $5, $6, $7)', ['Otti', 'Grant', 'Onyeukwu', 'otti.onyeukwu@gmail.com', '08068753218', 'wizzywise', '$2a$10$JR0.jzaGDj6pGHDe5W22h.rDMQqUYvi.2wxHhpKKPcSpb0MgCwuS.'], (er) => {
      if (er) {
        throw new Error('an error occured while trying to communicate with the database');
      } else {
        console.log('a user has been added for testing purposes');
      }
      done();
    });
  });
});

describe('/auth/signup', () => {
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
});

describe('/POST /api/v1/interventions/auth/login', () => {
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
      });
    done();
  });
});

describe('/POST /api/v1/interventions', () => {
  it('should create new interventions when the user inputs the require details', (done) => {
    const incident = {
      createdBy: 1,
      type: 'intervention',
      location: '10.65883N/8.8747849E',
      image: ["'ejdfklhakleidkjadgkhdkjsfkasjrfdkjf','sahanfdsbajsdhjadsfjbhadsnfbabsnfbdsfbbdsf'"],
      comment: 'hewdfksghgASBC JqncjrhhsncNhdjcafhgdahgncjwjew',
    };
    chai.request(server)
      .post('/api/v1/interventions')
      .send(incident)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].should.have.property('id').eql(1);
        res.body.data[0].should.have.property('message').eql('Created intervention record');
        done();
      });
  });
});
