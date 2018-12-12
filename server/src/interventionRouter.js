import express from 'express';
import InterventionController from './interventionController';

const router = express.Router();

router.post('/auth/signup', InterventionController.signUp);
router.post('/auth/login', InterventionController.login);
router.post('/', InterventionController.createIntervention);
module.exports = router;
