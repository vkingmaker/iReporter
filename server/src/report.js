import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

router.delete('/red-flags', RedflagsController.clearRecord);
module.exports = router;
