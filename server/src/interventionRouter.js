import express from 'express';
import Verify from './verify';
import InterventionController from './interventionController';

const router = express.Router();

router.post('/auth/signup', InterventionController.signUp);
router.post('/auth/login', InterventionController.login);
router.route('/').post(Verify.verifyUser, InterventionController.createIntervention);
router.route('/').get(Verify.verifyUser, InterventionController.retrieveAllInterventions);
router.route('/:id').get(Verify.verifyUser, InterventionController.retrieveByIdInterventions);
router.route('/:id/location').patch(Verify.verifyUser, InterventionController.updateLocationById);
module.exports = router;
