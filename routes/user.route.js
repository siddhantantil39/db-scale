var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller');

/* POST users listing. */
router.post('/', UserController.createUser);

//GET users listing
router.get('/:id', UserController.getUserById);

module.exports = router;
