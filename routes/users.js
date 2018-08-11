var express = require('express');
var router = express.Router();
const loadUsers = require('./middleware/load_users');
const verifyToken = require('./middleware/verify_token');

/* GET users listing. */
router.get('/',verifyToken,loadUsers, function(req, res, next) {
  res.status(200).send(req.users);
});

module.exports = router;
