const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);


// /GET 
// /api/v1/red-flags

describe('/PATCH a paticular location', () => {
  it('should Uupdate the location of a particular record', (done) => {  
    const record = {
      id: 1,
      location: '10.7857834N/94.756E',
    };

    chai.request(server)
      .patch(`/api/v1/red-flags/${record.id}/location`)
      .send(record)
      .end((req, res) =>{ 
        res.should.have.status(200);
        res.body.data[0].should.have.property('message').eql('Updated red-flag record\'s location');
        done();
      });
  });
});
