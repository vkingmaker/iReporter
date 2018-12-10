import db from './mock/db';

const records = db();

class RedflagsController {
  static clearRecord(req, res) {
    records.splice(0);
    res.status(200).send({
      status: res.statusCode,
      data: [{
        message: 'multiple red-flag records deleted',
      }],
    });
  }
}

export default RedflagsController;
