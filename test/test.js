const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);


// /DELETE
// /api/v1/red-flags

describe('/DELETE a paticular record', () => {
  it('should delete a particular record given an id', (done) => {  
    const record = {
      id: 1,
    };

    chai.request(server)
      .delete(`/api/v1/red-flags/${record.id}`)
      .send(record)
      .end((req, res) =>{ 
        res.should.have.status(200);
        res.body.data[0].should.have.property('message').eql('red-flag record has been deleted');
        done();
      });
  });

  it('should return an error message for wrong :id values', (done) => {  
    const record = {
      id: 4,
    };

    chai.request(server)
      .delete(`/api/v1/red-flags/${record.id}`)
      .send(record)
      .end((req, res) =>{ 
        res.should.have.status(400);
        res.body.data[0].should.have.property('message').eql('there is no record with the specified id');
        done();
      });
  });
});
