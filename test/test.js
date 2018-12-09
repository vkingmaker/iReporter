const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);


// /GET 
// /api/v1/red-flags/:id

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
