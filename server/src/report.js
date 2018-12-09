import express from 'express';
import RedflagsController from './redflagsController';

const router = express.Router();

/* GET home page. */
router.patch('/red-flags/:id/comment', RedflagsController.updateCommentGivenAnId);
module.exports = router;
