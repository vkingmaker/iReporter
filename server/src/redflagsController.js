import db from './mock/db';

let records = db();

class RedflagsController {
  static getRecords(req, res) {
    res.send({
      status: res.statusCode,
      data: [...records],
    });
  }
}

export default RedflagsController;
