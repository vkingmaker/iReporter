'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

var _interventionController = require('./interventionController');

var _interventionController2 = _interopRequireDefault(_interventionController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/auth/signup').post(_validation2.default.signup, _interventionController2.default.signUp);
router.post('/auth/login', _interventionController2.default.login);
router.route('/').post(_verify2.default.verifyUser, _interventionController2.default.createIntervention);
router.route('/').get(_verify2.default.verifyUser, _interventionController2.default.retrieveAllInterventions);
router.route('/:id').get(_verify2.default.verifyUser, _interventionController2.default.retrieveByIdInterventions);
router.route('/:id/location').patch(_verify2.default.verifyUser, _interventionController2.default.updateLocationById);
router.route('/:id/comment').patch(_verify2.default.verifyUser, _interventionController2.default.updateCommentById);
router.route('/:id').delete(_verify2.default.verifyUser, _interventionController2.default.deleteInterventionById);
router.route('/:id/status').patch(_verify2.default.verifyAdmin, _interventionController2.default.updateStatusById);
module.exports = router;