const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);

// /POST
// /api/v1/red-flags

describe('/POST a comment', () => {
  it('should create record', (done) => {  
    const record = {
      type: 'intervention',
      location: '10.756575E/9.844727W',
      status: 'under investigation',
      Images: '[Image,Image]',
      videos: '[video,video]',
      comment: 'Also remember the children starving in America',
    };

    chai.request(server)
      .post('/api/v1/red-flags')
      .send(record)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.data[0].should.have.property('message').eql('Created red-flag-record!');
        done();
      });
  });
});
