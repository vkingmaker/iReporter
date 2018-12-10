import db from './mock/db';

const records = db();

class RedflagsController {
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

}

export default RedflagsController;
