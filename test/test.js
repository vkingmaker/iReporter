const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);

describe('/GET/:id COMMENT', () => {
  it('should GET a comment by the given id', (done) => {
    const record = {
      id: 1,
    };
    chai.request(server)
      .get(`/api/v1/red-flags/${record.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('location');
        res.body.data[0].should.have.property('comment');
        res.body.data[0].should.have.property('Images');
        res.body.data[0].should.have.property('videos');
        res.body.data[0].should.include({ comment: 'Corruption in the system and the malpratices is just draining the life out of our lovely continent' });
        done();
      });
  });
});

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
describe('/PATCH a paticular comment', () => {
  it('should Uupdate the comment of a particular record', (done) => {  
    const record = {
      id: 1,
      comment: 'African can be great again! if only we can ensure individually',
    };

    chai.request(server)
      .patch(`/api/v1/red-flags/${record.id}/comment`)
      .send(record)
      .end((req, res) =>{ 
        res.should.have.status(200);
        res.body.data[0].should.have.property('message').eql('Updated red-flag record\'s comment');
        done();
      });
  });
});