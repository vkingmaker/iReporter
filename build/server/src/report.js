'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _redflagsController = require('./redflagsController');

var _redflagsController2 = _interopRequireDefault(_redflagsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.delete('/', _redflagsController2.default.clearRecord);
router.delete('/:id', _redflagsController2.default.deleteRecordGivenAnId);
router.patch('/:id/location', _redflagsController2.default.updateLocationGivenAnId);
router.patch('/:id/comment', _redflagsController2.default.updateCommentGivenAnId);
router.get('/:id', _redflagsController2.default.getRecordGivenAnId);
router.post('/', _redflagsController2.default.createRecord);
router.get('/', _redflagsController2.default.getRecords);
router.route('/:id/status').get(_verify2.default.verifyAdmin, _redflagsController2.default.updateStatusById);

module.exports = router;