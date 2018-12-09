import db from './mock/db';

const records = db();

class RedflagsController {
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
}

export default RedflagsController;
