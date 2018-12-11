import express from 'express';
import InterventionController from './interventionController';

const router = express.Router();

router.post('/auth/signup', InterventionController.signUp);
module.exports = router;
