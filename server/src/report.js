import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.delete('/red-flags/:id', RedflagsController.deleteRecordGivenAnId);
module.exports = router;
