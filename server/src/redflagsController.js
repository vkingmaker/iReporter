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

}

export default RedflagsController;
