import db from './mock/db';

const records = db();

class RedflagsController {
  static createRecord(req, res) {
    let addedRecord = {};
    if (records.length) {
      req.body.id = records[records.length - 1].id + 1;
      addedRecord = req.body;
      records.push(req.body);
    } else {
      req.body.id = 1;
      addedRecord = req.body;
      records.push(req.body);
    }
    res.status(201).send({
      status: res.statusCode,
      data: [{
        id: addedRecord.id,
        message: 'Created red-flag-record!',
      }],
    });
  }
}

export default RedflagsController;
