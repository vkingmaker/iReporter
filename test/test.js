const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);


// /DELETE
// /api/v1/red-flags

describe('/DELETE comments', () => {
  it('it should DELETE a all the records', (done) => {
    chai.request(server)
      .delete('/api/v1/red-flags')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data[0].should.have.property('message').eql('multiple red-flag records deleted');
        done();
      });
  });
});
