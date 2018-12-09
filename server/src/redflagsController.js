import db from './mock/db';

const records = db();

class RedflagsController {
  static getRecordGivenAnId(req, res) {
    const particularRecord = records.filter((value) => {
      if (value.id === +req.params.id) return value;
    });
    res.status(200).send({
      status: res.statusCode,
      data: [...particularRecord],
    });
  }

}

export default RedflagsController;
