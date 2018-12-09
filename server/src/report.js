import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

router.get('/red-flags/:id', RedflagsController.getRecordGivenAnId);
router.post('/red-flags', RedflagsController.createRecord);
router.get('/red-flags', RedflagsController.getRecords);

module.exports = router;
