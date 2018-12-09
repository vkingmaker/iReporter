import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.post('/red-flags', RedflagsController.createRecord);
module.exports = router;
