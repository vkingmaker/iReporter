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
  
 static deleteRecordGivenAnId(req, res) {
    let checkId = [];
    checkId = records.filter((value) => {
      if (value.id === +req.params.id) {
        return true;
      }
    });
    if (checkId[0]) {
      records.splice(req.params.id - 1, 1);
      res.status(200).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'red-flag record has been deleted',
        }],
      });
    } else {
      res.status(400).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'there is no record with the specified id',
        }],
      });
    }
  }
  
 static updateLocationGivenAnId(req, res) {
    const locationToUpdate = records.filter((value) => {
      if (value.id === +req.params.id) {
        return value;
      }
    });
    locationToUpdate[0].location = req.body.location;
    res.status(200).send({
      status: res.statusCode,
      data: [{
        id: +req.params.id,
        message: 'Updated red-flag record\'s location',
      }],
    });
  }
   
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
      data: [{
        message: 'multiple red-flag records deleted',
      }],
    });
    if (checkId[0]) {
      records.splice(req.params.id - 1, 1);
      res.status(200).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'red-flag record has been deleted',
        }],
      });
    } else {
      res.status(400).send({
        status: res.statusCode,
        data: [{
          id: +req.params.id,
          message: 'there is no record with the specified id',
        }],
      });
    }
  }

}

export default RedflagsController;
