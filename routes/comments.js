var express = require('express');
var router = express.Router();
const loadComments = require('./middleware/load_comments');
const createComments = require('./middleware/create_comment');
const verifyToken = require('./middleware/verify_token');

router.post('/byNameAdressNumber', verifyToken, loadComments, function(req, res, next) {
  res.status(200).send(req.comments);
});
router.post('/addNew', verifyToken, createComments);

module.exports = router;