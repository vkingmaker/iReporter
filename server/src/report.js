import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

router.delete('/', RedflagsController.clearRecord);
router.delete('/:id', RedflagsController.deleteRecordGivenAnId);
router.patch('/:id/location', RedflagsController.updateLocationGivenAnId);
router.patch('/:id/comment', RedflagsController.updateCommentGivenAnId);
router.get('/:id', RedflagsController.getRecordGivenAnId);
router.post('/', RedflagsController.createRecord);
router.get('/', RedflagsController.getRecords);

module.exports = router;
