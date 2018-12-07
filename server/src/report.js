import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.get('/red-flags', RedflagsController.getRecords);
router.get('/red-flags/:id', RedflagsController.getRecordGivenAnId);
router.post('/red-flags', RedflagsController.createRecord);
router.patch('/red-flags/:id/comment', RedflagsController.updateCommentGivenAnId);
router.patch('/red-flags/:id/location', RedflagsController.updateLocationGivenAnId);
router.delete('/red-flags/:id', RedflagsController.deleteRecordGivenAnId);
router.delete('/red-flags', RedflagsController.clearRecord);
module.exports = router;
