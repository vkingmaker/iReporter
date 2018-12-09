import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

router.get('/red-flags/:id', RedflagsController.getRecordGivenAnId);
module.exports = router;
