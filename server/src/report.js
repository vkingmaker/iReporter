import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.get('/red-flags', RedflagsController.getRecords);

module.exports = router;
