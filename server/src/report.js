import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.delete('/red-flags/:id', RedflagsController.deleteRecordGivenAnId);
router.patch('/red-flags/:id/location', RedflagsController.updateLocationGivenAnId);
router.patch('/red-flags/:id/comment', RedflagsController.updateCommentGivenAnId);
router.get('/red-flags/:id', RedflagsController.getRecordGivenAnId);
router.post('/red-flags', RedflagsController.createRecord);
router.get('/red-flags', RedflagsController.getRecords);

module.exports = router;
