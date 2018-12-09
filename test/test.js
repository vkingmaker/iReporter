const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// console.log(server);
let should = chai.should();

chai.use(chaiHttp);


// /GET 
// /api/v1/red-flags

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
