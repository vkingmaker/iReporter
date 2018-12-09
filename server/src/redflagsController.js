import db from './mock/db';

const records = db();

class RedflagsController {
  static updateCommentGivenAnId(req, res) {
    const recordToUpdate = records.filter((value) => {
      if (value.id === +req.params.id) {
        return value;
      }
    });
    recordToUpdate[0].comment = req.body.comment;
    res.status(200).send({
      status: res.statusCode,
      data: [{
        id: +req.params.id,
        message: 'Updated red-flag record\'s comment',
      }],
    });
  }
      
  static getRecordGivenAnId(req, res) {
    const particularRecord = records.filter((value) => {
      if (value.id === +req.params.id) return value;
    });
    res.status(200).send({
      status: res.statusCode,
      data: [...particularRecord],
    });
  }
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
   static getRecords(req, res) {
    res.send({
      status: res.statusCode,
      data: [...particularRecord],
    });
  }

}

export default RedflagsController;
