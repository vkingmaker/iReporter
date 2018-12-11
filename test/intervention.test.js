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
    done();
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
    }
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
