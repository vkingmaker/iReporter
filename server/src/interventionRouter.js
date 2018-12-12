import express from 'express';
import Verify from './verify';
import InterventionController from './interventionController';

const router = express.Router();

router.post('/auth/signup', InterventionController.signUp);
router.post('/auth/login', InterventionController.login);
router.route('/').post(Verify.verifyUser, InterventionController.createIntervention);
router.route('/').get(Verify.verifyUser, InterventionController.retrieveAllInterventions);
module.exports = router;
