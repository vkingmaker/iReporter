'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _verify = require('../middlewares/verify');

var _verify2 = _interopRequireDefault(_verify);

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _interventionController = require('../controllers/interventionController');

var _interventionController2 = _interopRequireDefault(_interventionController);

var _redflagsController = require('../controllers/redflagsController');

var _redflagsController2 = _interopRequireDefault(_redflagsController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/auth/signup').post(_validation2.default.signup, _userController2.default.signUp);
router.post('/auth/login', _userController2.default.login);

/*
* Routes for intervention related operations
*
*/

router.route('/interventions').post(_verify2.default.verifyUser, _interventionController2.default.createIntervention);
router.route('/interventions').get(_verify2.default.verifyUser, _interventionController2.default.retrieveAllInterventions);
router.route('/interventions/:id').get(_verify2.default.verifyUser, _interventionController2.default.retrieveByIdInterventions);
router.route('/interventions/:id/location').patch(_verify2.default.verifyUser, _interventionController2.default.updateLocationById);
router.route('/interventions/:id/comment').patch(_verify2.default.verifyUser, _interventionController2.default.updateCommentById);
router.route('/interventions/:id').delete(_verify2.default.verifyUser, _interventionController2.default.deleteInterventionById);
router.route('/interventions/:id/status').patch(_verify2.default.verifyAdmin, _interventionController2.default.updateStatusById);

/*
* Routes for red-flag related operations
*
*/

router.delete('/red-flags/:id', _redflagsController2.default.deleteRecordGivenAnId);
router.patch('/red-flags/:id/location', _redflagsController2.default.updateLocationGivenAnId);
router.patch('/red-flags/:id/comment', _redflagsController2.default.updateCommentGivenAnId);
router.get('/red-flags/:id', _redflagsController2.default.getRecordGivenAnId);
router.get('/red-flags', _redflagsController2.default.getRecords);
router.route('/red-flags/:id/status').get(_verify2.default.verifyAdmin, _redflagsController2.default.updateStatusById);

module.exports = router;